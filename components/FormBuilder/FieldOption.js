"use client";
import { useEffect, useRef, useState } from "react";
import EllipsisVerticle from "@/components/utils/icons/EllipsisVerticle";

const Options = Object.freeze({
    Setting: "Setting",
    Duplicate: "Duplicate",
    Delete: "Delete",
});

export default function FieldOption({ disable, field_id, handleFieldSetting, handleFieldDuplicate, handleFieldDelete }) {
    const ulRef = useRef(null);
    const [showOption, setShowOption] = useState(false);

    useEffect(() => {
        const handleClickOutside = e => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowOption(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = (keyName) => {
        switch(Options[keyName]) {
            case Options.Setting:
                handleFieldSetting(field_id);
                break;
            case Options.Duplicate: 
                handleFieldDuplicate(field_id);
                break;
            case Options.Delete:
                handleFieldDelete(field_id);
                break;
            default:
                console.log(`Invalid request with Options name ${keyName}`);
                break;
        }
        setShowOption(false);
    }

    return (
        <div className={`absolute top-0 right-0 transition-all duration-300 ${showOption ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}`}>
            <button
                type="button"
                className="cursor-pointer focus:outline-none focus:border-none"
                onClick={() => setShowOption(!showOption)}
            >
                <EllipsisVerticle strokeWidth={2} />
            </button>
            <ul 
                ref={ulRef}
                className={`flex absolute top-5 left-1/2 ml-1 border border-gray-700/50 ${showOption ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                {Object.keys(Options).map(name => {
                    return (
                        <ListItem key={name} name={name} handleClick={handleClick} />
                    )
                })}
            </ul>
        </div>
    );
}

function ListItem({ name, handleClick }) {
    return (
        <li>
            <button
                type="button"
                className={`field_option_btn ${Options[name] === Options.Delete && "hover:bg-red-400"}`}
                onClick={() => handleClick(name)}
            >{Options[name]}</button>
        </li>
    )
}