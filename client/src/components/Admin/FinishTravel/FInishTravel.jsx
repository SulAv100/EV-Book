import React,{useState, useEffect} from 'react';
import './FinishTravel.css'; 

function FinishTravel() {
  const travelHistory = [
    { sn: 1, busNo: 'B123', date: '2024-09-01', route: 'A to B' },
    { sn: 2, busNo: 'B456', date: '2024-09-05', route: 'B to C' },
    { sn: 3, busNo: 'B789', date: '2024-09-09', route: 'C to D' }
  ];

  const fetchCompletedTravel = async ()=>{
    try{
      const response = await fetch("http://localhost:3000/api/auth/removeTravel",{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchCompletedTravel();
  },[])

  return (
    <div className="travel-container">
      <h1>Bus Travel History</h1>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Bus No</th>
            <th>Date</th>
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          {travelHistory.map((travel, index) => (
            <tr key={index}>
              <td>{travel.sn}</td>
              <td>{travel.busNo}</td>
              <td>{travel.date}</td>
              <td>{travel.route}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinishTravel;
