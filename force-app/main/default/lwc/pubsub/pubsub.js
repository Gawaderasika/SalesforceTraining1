const events={};

const samePageRef=(pageRef1, pageRef2)=>{
    const obj1=pageRef1.attributes;
    const obj2=pageRef2.attributes;
    return Object
        .keys(obj1)
        .concat(Object.keys(obj2))
        .every(key=>{
            return obj1[key]===obj2[key];
        });
};

const registerListener=(eventName, callback, thisArg)=>{
    if(!thisArg.pageRef){
        throw new Error(
            'public listener need a "@wire(currentPageReference) pageRef" property'
        );
    }
    if(!events[eventName]){
        events[eventName]=[];
    }
    const duplicate=events[eventName].find(listerner=>{
        return listerner.callback===callback && listerner.thisArg===thisArg;
    });
    if(!duplicate){
        events[eventName].push({callback, thisArg});
    }
};

const unregisterListener=(eventName, callback, thisArg)=>{
    if(event[eventName]){
        events[eventName]=events[eventName].filter(
            listener=>
                listener.callback!=callback || listener.thisArg!==thisArg
        );
    }
};

const unregisterAllListener=thisArg=>{
    Object.keys(events).forEach(eventName=>{
        events[eventName]=events[eventName].filter(
            listener=>listener.thisArg!=thisArg
        );
    });
};
const fireEvent=(pageRef, eventName, payload)=>{
    if(events[eventName]){
        const listeners=events[eventName];
        listeners.forEach(listener=>{
            if(samePageRef(pageRef, listener.thisArg.pageRef)){
                try{
                    listener.callback.call(listener.thisArg, payload);
                }catch(error){

                }
            }
        });
    }
};
export{
    registerListener,
    unregisterListener,
    unregisterAllListener,
    fireEvent
};