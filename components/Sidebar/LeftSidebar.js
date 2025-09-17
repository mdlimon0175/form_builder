"use client"
import { useDrag, useDrop } from 'react-dnd';

import defaultFieldsListData from "@/lib/defaultFieldsListData"

export default function LeftSidebar({ className, handleAddField }) {
    return (
        <div className={className}>
            <div className="bg-gray-100 p-5 rounded-2xl space-y-6">
                <h3 className="text-xl text-gray-700">Drag field to add new field</h3>
                <div className="space-y-2.5">
                    {defaultFieldsListData.map(field => {
                        return <DefaultFieldItem key={field.type} field={field} />
                    })}
                </div>
            </div>
        </div>
    )
}

function DefaultFieldItem({ field }) {
    const [, drag] = useDrag({
        type: 'FIELD',
        item: field
    });

    return (
        <div ref={drag} className="py-2 px-4 bg-white rounded-xl text-gray-600">
            <span>{`Add ${field.type} field`}</span>
        </div>
    )
}