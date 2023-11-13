import React, {useState} from 'react';
import {RadioGroup} from "@headlessui/react";
import classNames from 'classnames';


function Form() {
    const [formData, setFormData] = useState({
        x: '',
        y: '',
        z: '',
        vintage: '',
        region: '',
        notes: '',
        producer: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleSubmit = async () => {
        console.log('Submitting data:', formData);

        try {
            const response = await fetch('http://localhost:3001/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('Response:', response);

            if (response.ok) {
                // Data was successfully added to the local API
                console.log('Data submitted successfully');
                setFormData({
                    x: '',
                    y: '',
                    z: '',
                    vintage: '',
                    region: '',
                    notes: '',
                    producer: '',
                });
                setSubmissionStatus('success');
            } else {
                // Handle error and set the status to "error"
                console.error('Failed to add data');
                setSubmissionStatus('error');
            }
        } catch (error) {
            // Handle error and set the status to "error"
            console.error('An error occurred:', error);
            setSubmissionStatus('error');
        }
    };

    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900">Add Bottle</h1>
                {submissionStatus === 'success' && <div className="text-green-800">Data submitted successfully!</div>}
                {submissionStatus === 'error' &&
                    <div className="text-red-800">Failed to submit data. Please try again.</div>}
                <div className="mt-5 border-t border-b border-gray-400 pt-5">
                    <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 ">
                        <div>
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Bottle Position</h2>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Shelf number
                                        <div className="mt-1">
                                            <select
                                                name="z"
                                                value={formData.z}
                                                onChange={handleInputChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                                {/*note: handling value here in proper CS style such that 0 is the bottom shelf*/}
                                                <option value="0"> 1 - bottom shelf</option>
                                                {Array.from({length: 14}, (_, index) => (
                                                    <option key={index} value={index + 1}>
                                                        {index + 2}
                                                    </option>
                                                ),)}
                                                <option value="15"> 16 - top shelf</option>
                                            </select>
                                        </div>
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Position from left
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="x"
                                                value={formData.x}
                                                onChange={handleInputChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                                        </div>
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Front or back
                                        {/*0 = front and 1 = back*/}
                                        <div className="mt-1">
                                            <RadioGroup value={formData.y}
                                                        onChange={value => setFormData({...formData, y: value})}>
                                                <RadioGroup.Option value="0" className="block">
                                                    {({checked}) => (
                                                        <div
                                                            className={classNames(
                                                                'relative rounded-md p-2 cursor-pointer',
                                                                checked ? 'bg-indigo-100' : 'bg-white'
                                                            )}
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="text-sm">
                                                                    <RadioGroup.Label as="span"
                                                                                      className="font-medium text-gray-900">
                                                                        Front
                                                                    </RadioGroup.Label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </RadioGroup.Option>
                                                <RadioGroup.Option value="1" className="mt-2 block">
                                                    {({checked}) => (
                                                        <div className={classNames(
                                                            'relative rounded-md p-2 cursor-pointer',
                                                            checked ? 'bg-indigo-100' : 'bg-white'
                                                        )}
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="text-sm">
                                                                    <RadioGroup.Label as="span"
                                                                                      className="font-medium text-gray-900">
                                                                        Back
                                                                    </RadioGroup.Label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </RadioGroup.Option>
                                            </RadioGroup>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="mt-5 border-t border-gray-200 pt-5">
                                <h2 className="text-lg font-medium text-gray-900">Bottle details</h2>
                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Vintage
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="vintage"
                                                    value={formData.vintage}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Region
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="region"
                                                    value={formData.region}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tasting Notes
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="notes"
                                                    value={formData.notes}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Producer
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="producer"
                                                    value={formData.producer}
                                                    onChange={handleInputChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Form;

