const API_URL = 'https://haix.ai/api';

// Unique table name for this app
const randomString = 'z7r2p9k4';
export const TABLE_NAME = `relaxation_logs_${randomString}`;

export interface RelaxationLog {
  id: number;
  prompt_id: string;
  completed_at: string;
  mood_after?: string;
}

export async function getLogs(): Promise<RelaxationLog[]> {
  const response = await fetch(`${API_URL}/${TABLE_NAME}`);
  if (!response.ok) return [];
  return response.json();
}

export async function logCompletion(promptId: string, mood?: string): Promise<RelaxationLog> {
  const response = await fetch(`${API_URL}/${TABLE_NAME}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      prompt_id: promptId, 
      mood_after: mood,
      completed_at: new Date().toISOString()
    }),
  });
  if (!response.ok) throw new Error('Failed to log completion');
  return response.json();
}