import * as React from "react"

export const Tabs = ({ className, value, onValueChange, ...props }) => {
    return (
        <div className={`w-full ${className}`} data-orientation="horizontal" {...props} />
    )
}

export const TabsList = ({ className, ...props }) =>{
    return (
        <div 
            className={`inline-flex h-10 items-center justify-center rounded-md bg-slate-800 p-1 text-slate-400 ${className}`}
            {...props}
        />
    )
}

export const TabsTrigger = ({ className, value, selected, ...props }) => {
    return (
        <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
      ${selected ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 hover:text-slate-100'} ${className}`}
            value={value}
            {...props}
        />
    )
}

export const TabsContent = ({ className, value, activeTab, ...props }) => {
    if (value !== activeTab) return null;

    return (
        <div
            className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fadeIn ${className}`}
            {...props}
        />
    )
}