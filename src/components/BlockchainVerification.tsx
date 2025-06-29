import React, { useState } from 'react';
import { Shield, Link, CheckCircle, Hash, Clock } from 'lucide-react';

interface BlockchainRecord {
  id: string;
  timestamp: string;
  action: string;
  hash: string;
  verified: boolean;
}

export default function BlockchainVerification() {
  const [records, setRecords] = useState<BlockchainRecord[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      action: 'Faculty status updated to Available',
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890',
      verified: true
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      action: 'Appointment confirmed',
      hash: '0x9876543210fedcba0987654321abcdef',
      verified: true
    }
  ]);

  const [isVerifying, setIsVerifying] = useState(false);

  const verifyRecord = async (recordId: string) => {
    setIsVerifying(true);
    
    // Simulate blockchain verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setRecords(prev => prev.map(record => 
      record.id === recordId 
        ? { ...record, verified: true }
        : record
    ));
    
    setIsVerifying(false);
  };

  const addNewRecord = (action: string) => {
    const newRecord: BlockchainRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action,
      hash: `0x${Math.random().toString(16).substr(2, 32)}`,
      verified: false
    };
    
    setRecords(prev => [newRecord, ...prev]);
    
    // Auto-verify after 3 seconds (simulate mining)
    setTimeout(() => verifyRecord(newRecord.id), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Link className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Blockchain Verification</h3>
        </div>
        <button
          onClick={() => addNewRecord('Test transaction')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add Record
        </button>
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {record.verified ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-600 animate-spin" />
                )}
                <span className="font-medium text-gray-900">{record.action}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                record.verified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {record.verified ? 'Verified' : 'Pending'}
              </span>
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Hash className="w-3 h-3" />
                <span className="font-mono">{record.hash}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3" />
                <span>{new Date(record.timestamp).toLocaleString()}</span>
              </div>
            </div>

            {!record.verified && (
              <button
                onClick={() => verifyRecord(record.id)}
                disabled={isVerifying}
                className="mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors disabled:opacity-50"
              >
                {isVerifying ? 'Verifying...' : 'Verify Now'}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-4 h-4 text-purple-600" />
          <span className="font-medium text-purple-900">Blockchain Benefits</span>
        </div>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Immutable record of all faculty status changes</li>
          <li>• Transparent appointment verification</li>
          <li>• Tamper-proof audit trail</li>
          <li>• Decentralized trust system</li>
        </ul>
      </div>
    </div>
  );
}