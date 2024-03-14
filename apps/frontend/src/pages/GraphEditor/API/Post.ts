/**
 * Function to send data to a server.
 * @param data Object containing the name, nodes, and edges.
 * @returns Promise that resolves to the data returned by the server.
 * @throws Error if there is any problem during data sending.
 */

import { Node, Edge } from "reactflow";
export default async function postData(data: { name: string; nodes: Node[]; edges: Edge[]; }) {
    const url = "http://localhost:3000/post";
  
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
    
      const response = await fetch(url, requestOptions);
    
      if (!response.ok) {
        throw new Error('Error');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error('Error:'+ error);
    }
  }
