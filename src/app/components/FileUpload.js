'use client';

import React, { useState, useEffect } from "react";
import AnalysisDashboard from "./Ananlysis";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysis, setAnalysis] = useState(null);

    // Load cached data from localStorage on component mount
    useEffect(() => {
        const cachedData = localStorage.getItem("analysisData");
        if (cachedData) {
            setAnalysis(JSON.parse(cachedData));
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please upload a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/gemini", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to analyze file.");
            }

            const result = await response.json();
            console.log(result);
            setAnalysis(result);

            // Save result to localStorage
            localStorage.setItem("analysisData", JSON.stringify(result));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClearCache = () => {
        localStorage.removeItem("analysisData");
        setAnalysis(null);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center">
            <div className="w-full space-y-8 text-center">
                <div className="max-w-4xl mx-auto w-full space-y-8 text-center">
                    <h1 className="mt-8 text-4xl font-bold">Analyze Your Text File</h1>
                    <p className="text-slate-400">
                        Upload a text file to analyze its content, or view previous analysis results if available.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 p-6 bg-slate-800 rounded-lg shadow-md"
                    >
                        <div>
                            <label
                                htmlFor="file"
                                className="block text-slate-200 font-medium mb-2"
                            >
                                Upload File
                            </label>
                            <input
                                id="file"
                                type="file"
                                accept=".txt"
                                onChange={handleFileChange}
                                className="w-full p-2 text-slate-900 bg-slate-100 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {error && (
                                <p className="mt-2 text-red-400 text-sm">{error}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-4 py-2 rounded-lg font-medium text-white transition-colors ${loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                                }`}
                        >
                            {analysis
                                ? loading
                                    ? "Processing..."
                                    : "Upload a New File to Analyze"
                                : loading
                                    ? "Processing..."
                                    : "Upload and Analyze"}
                        </button>
                    </form>
                </div>

                {analysis && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            Analysis Results
                        </h2>
                        <div className="mt-8 bg-slate-800 rounded-lg shadow-md">
                            <AnalysisDashboard analysis={analysis} />
                            <button
                                onClick={handleClearCache}
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Clear Cached Data
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;