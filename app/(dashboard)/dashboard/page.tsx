import React from 'react'

export default function Page() {
  const people = [
    { name: 'John Doe', email: 'john@example.com', status: 'lead' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'pending' },
    { name: 'Bob Johnson', email: 'bob@example.com', status: 'approved' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-colors flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Broadcast Message</h2>
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>
        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-colors flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Send Promotions and Offers</h2>
          <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        {people.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {people.map((person, index) => (
              <li key={index} className="flex items-center justify-between p-4">
                <div>
                  <h3 className="text-lg font-medium">{person.name}</h3>
                  <p className="text-gray-500">{person.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${person.status === 'lead' ? 'bg-blue-100 text-blue-800' :
                    person.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}>
                  {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-4 text-gray-500">No interactions added yet.</p>
        )}
      </div>
    </div>
  )
}
