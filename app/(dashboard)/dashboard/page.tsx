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
       <h1 className="text-2xl font-bold">Manage Your Leads and Contacts</h1>
       <p className="text-gray-600">Track and organize your interactions with potential clients and partners</p>
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
