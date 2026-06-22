"use client";
import { useEffect, useRef, useState } from "react";
import EllipsisVerticle from "@/components/utils/icons/EllipsisVerticle";

const Options = Object.freeze({
    Setting: "Setting",
    Duplicate: "Duplicate",
    Delete: "Delete",
});

export default function FieldOption({ field_id, handleFieldSetting, handleFieldDuplicate, handleFieldDelete }) {
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
        <div className={`absolute top-0 right-2 lg:right-0 transition-all duration-300 opacity-100 visible ${showOption ? "lg:opacity-100 lg:visible" : "lg:opacity-0 lg:invisible lg:group-hover:opacity-100 lg:group-hover:visible"}`}>
            <button
                type="button"
                className="cursor-pointer focus:outline-none focus:border-none"
                onClick={() => setShowOption(!showOption)}
            >
                <EllipsisVerticle className={"rotate-90 lg:rotate-0 size-5 text-gray-700"} strokeWidth={2} />
            </button>
            <ul 
                ref={ulRef}
                className={`absolute flex-col z-[999999] lg:flex-row top-5 right-1/2 sm:right-2 sm:translate-x-full ml-1 border border-gray-700/50 ${showOption ? "flex" : "hidden"}`}
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
                className={`${Options[name] === Options.Delete ? "bg-red-400 hover:bg-red-500/90 text-white" : ""} field_option_btn`}
                onClick={() => handleClick(name)}
            >{Options[name]}</button>
        </li>
    )
}