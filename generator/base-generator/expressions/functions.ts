import { Expression, SimpleExpression } from "./base";
import { Identifier } from "./common";
import { TypeExpression } from "./type";
import { toStringOptions, GeneratorContext, VariableExpression } from "../types";
import { Block, ReturnStatement } from "./statements";
import { BindingPattern } from "./binding-pattern";
import { variableDeclaration, compileType } from "../utils/string";
import { Component } from "./component";
import { VariableStatement } from "./variables";
import SyntaxKind from "../syntaxKind";
import { getJsxExpression, JsxExpression } from "./jsx";
import { Decorator } from "./decorator";

export class Parameter {
    decorators: Decorator[]
    modifiers: string[];
    dotDotDotToken: any;
    name: Identifier | BindingPattern;
    questionToken: string;
    type?: TypeExpression;
    initializer?: Expression;
    constructor(decorators: Decorator[], modifiers: string[], dotDotDotToken: any, name: Identifier | BindingPattern, questionToken: string = "", type?: TypeExpression, initializer?: Expression) {
        this.decorators = decorators;
        this.modifiers = modifiers;
        this.dotDotDotToken = dotDotDotToken;
        this.name = name;
        this.questionToken = questionToken;
        this.type = type;
        this.initializer = initializer;
    }

    typeDeclaration() {
        return variableDeclaration(this.name, this.type?.toString() || "any", undefined, this.questionToken);
    }

    toString() {
        return variableDeclaration(this.name, this.type?.toString(), this.initializer, this.questionToken);
    }
}

export function getTemplate(
    functionWithTemplate: BaseFunction,
    options?: toStringOptions,
    doNotChangeContext = false,
    globals?: VariableExpression
) {
    if (!functionWithTemplate.isJsx()) {
        return;
    }

    const statements = functionWithTemplate.body instanceof Block ?
        functionWithTemplate.body.statements :
        [functionWithTemplate.body];
    
    const returnStatement = functionWithTemplate.body instanceof Block ?
        statements.find(s => s instanceof ReturnStatement) :
        statements[0];

    if (returnStatement) { 
        const componentParamenter = functionWithTemplate.parameters[0];
        if (options) { 
            if (!doNotChangeContext && componentParamenter && componentParamenter.name instanceof Identifier) { 
                options.componentContext = componentParamenter.name.toString();
            }

            options.variables = statements.reduce((v: VariableExpression, statement) => {
                if (statement instanceof VariableStatement) { 
                    return {
                        ...statement.declarationList.getVariableExpressions(),
                        ...v
                    }
                }
                return v;
            }, {
                ...globals
            });

            if (componentParamenter && componentParamenter.name instanceof BindingPattern) {
                options.componentContext = SyntaxKind.ThisKeyword;
                options.variables = {
                    ...componentParamenter.name.getVariableExpressions(new SimpleExpression(options.componentContext)),
                    ...options.variables
                }
            }
        }
        
        return getJsxExpression(returnStatement);
    }
}

export class BaseFunction extends Expression { 
    modifiers: string[];
    typeParameters: string[];
    parameters: Parameter[];
    type?: TypeExpression;
    body: Block | Expression;
    context: GeneratorContext;

    constructor(modifiers: string[] = [], typeParameters: any, parameters: Parameter[], type: TypeExpression|undefined, body: Block | Expression, context: GeneratorContext) { 
        super();
        this.modifiers = modifiers;
        this.typeParameters = typeParameters;
        this.parameters = parameters;
        this.type = type;
        this.body = body;
        this.context = context;
    }

    getDependency() { 
        return this.body.getDependency();
    }

    getToStringOptions(options?: toStringOptions) { 
        const widget = this.parameters[0] && this.context.components?.[this.parameters[0].type?.toString() || ""];
        if (widget && widget instanceof Component) { 
            options = {
                members: widget.members.filter(m => m.decorators.find(d => d.name === "Template" || d.name === "Slot")),
                componentContext: this.parameters[0].name.toString(),
                newComponentContext: this.parameters[0].name.toString()
            };
        }
        return options;
    }

    isJsx() { 
        return this.body.isJsx();
    }

    processTemplateExpression(expression?: JsxExpression) {
        return expression;
    }

    getTemplate(options?: toStringOptions, doNotChangeContext = false): string {
        return this.processTemplateExpression(
            getTemplate(this, options, doNotChangeContext, this.context.globals)
        )?.toString(options) || "";
    }
}

export class Function extends BaseFunction {
    decorators: Decorator[];
    asteriskToken: string;
    name?: Identifier;
    body: Block;
    constructor(decorators: Decorator[] = [], modifiers: string[]|undefined, asteriskToken: string, name: Identifier | undefined, typeParameters: any, parameters: Parameter[], type: TypeExpression|undefined, body: Block, context: GeneratorContext) {
        super(modifiers, typeParameters, parameters, type, body, context);
        this.decorators = decorators;
        this.asteriskToken = asteriskToken;
        this.name = name;
        this.body = body;
    }

    toString(options?: toStringOptions) {
        options = this.getToStringOptions(options);
        return `${this.modifiers.join(" ")} function ${this.name || ""}(${
            this.parameters
            })${compileType(this.type?.toString())}${this.body.toString(options)}`;
    }
}

export class ArrowFunction extends BaseFunction {
    typeParameters: string[];
    parameters: Parameter[];
    body: Block | Expression;
    equalsGreaterThanToken: string;
    constructor(modifiers: string[]|undefined, typeParameters: any, parameters: Parameter[], type: TypeExpression|undefined, equalsGreaterThanToken: string, body: Block | Expression, context: GeneratorContext) {
        super(modifiers, typeParameters, parameters, type, body, context);
        this.typeParameters = typeParameters;
        this.parameters = parameters;
        this.body = body;
        this.equalsGreaterThanToken = equalsGreaterThanToken;
    }

    toString(options?: toStringOptions) {
        const bodyString = this.body.toString(this.getToStringOptions(options));
        return `${this.modifiers.join(" ")} (${this.parameters})${compileType(this.type?.toString())} ${this.equalsGreaterThanToken} ${bodyString}`;
    }
}