import React, {useState, useEffect} from 'react';

function TableComponent() {

    // Generate an array for the rows
    const rows = Array.from({length: 28}, (_, index) => {
        if (index % 2 === 0) {
            const number = Math.floor(index / 2) + 1;
            return `${number} - front`;
        } else {
            const number = Math.floor(index / 2) + 1;
            return `${number} - back`;
        }
    });

    // Generate an array for the columns
    const columns = Array.from({length: 6}, (_, index) => index);

    // State to store API data
    const [apiData, setApiData] = useState([]);

    // Function to fetch API data based on x, y, and z values
    const fetchData = async (x, y, z) => {
        try {
            const response = await fetch(
                `http://localhost:3001/data?x=${x}&y=${y}&z=${z}`
            );
            const data = await response.json();

            console.log('API Response:', data);

            return data.name; // Assuming the API response has a 'name' field
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };



    // useEffect to make API calls when the component mounts
    useEffect(() => {
        const fetchDataForRows = async () => {
            const dataPromises = rows.map((row, index) => {
                const x = Math.floor(index / 2) + 1;
                const y = index % 2;
                const z = 15 - Math.floor(index / 2);
                return fetchData(x, y, z);
            });

            const rowData = await Promise.all(dataPromises);
            setApiData(rowData);
        };

        fetchDataForRows();
    }, []); // Empty dependency array ensures useEffect runs only once on mount


    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Row/Position
                                </th>
                                {columns.map((col) => (
                                    <th
                                        key={col}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {rows.map((row, rowIndex) => (
                                <tr key={row}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{row}</div>
                                    </td>
                                    {columns.map((col) => (
                                        <td key={col} className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {apiData[rowIndex * 6 + col] || 'empty'}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">15</div>
                                </td>
                                {columns.map((col) => (
                                    <td key={col} className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {apiData[30 * 6 + col] || 'empty'}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">16</div>
                                </td>
                                {columns.map((col) => (
                                    <td key={col} className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {apiData[31 * 6 + col] || 'empty'}
                                        </div>
                                    </td>
                                ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableComponent;
