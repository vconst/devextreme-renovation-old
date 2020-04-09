function view(model: Widget) {

}
function subscribe(p: string, s: number, i: number) {
    return 1;
}
function unsubscribe(id: number) {
    return undefined;
}
declare type WidgetInput = {
    p: string;
    s: number;
    defaultS?:number;
    sChange?:(s:number)=>void
}
export const WidgetInput: WidgetInput = {
    p: "10",
    s: 10,
    sChange:()=>{}
};

import React, { useState, useCallback, useEffect } from 'react';
interface Widget {
    props: WidgetInput;
    i: number;
    restAttributes: any;
}

export default function Widget(props: WidgetInput) {
    const [__state_s, __state_setS] = useState(() => (props.s !== undefined ? props.s : props.defaultS) || 10);;
    const [__state_i, __state_setI] = useState(10);

    useEffect(() => {
        const id = subscribe(props.p, (props.s !== undefined ? props.s : __state_s), __state_i)
        __state_setI(15)
        return () => unsubscribe(id);
    },
        [props.p, props.s, __state_s, props.sChange, __state_i])
    const restAttributes=useCallback(function restAttributes(){
        const { defaultS, p, s, sChange, ...restProps } = props;
        return restProps;
    }, [props]);

    return view(({
        props: {
            ...props,
            s: props.s !== undefined ? props.s : __state_s
        },
        i: __state_i,
        restAttributes: restAttributes()
    })
    );
}

Widget.defaultProps = {
    ...WidgetInput
}