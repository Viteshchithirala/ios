// /src/Services/JobService.ts
// import axios from 'axios';
import { JobData } from '@models/Model';
import { JobCounts } from '@models/Model';
import apiClient from '../login/ApiClient';
import { Buffer } from 'buffer';
import axios from 'axios';
import { API_BASE_URL } from '@env';
export const fetchCompanyLogo = async (
  recruiterId: number | null,
  userToken: string | null
): Promise<string | null> => {
  if (!recruiterId) {
    console.error("Recruiter ID is null");
    return null;
  }
 
  try {
    const response = await axios.get(`${API_BASE_URL}/recruiters/companylogo/download/${recruiterId}`, {
      headers: { Authorization: `Bearer ${userToken}` },
      responseType: 'arraybuffer', // Specify binary data response
    });
    //console.log("Company logo datass:", response);
    // Convert binary data to Base64
    const base64Logo = `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
    //console.log("Company logo (Base64):", base64Logo);
 
    return base64Logo;
  } catch (error) {
    console.error("Error fetching or converting company logo:", error);
    return null;
  }
};
 
 
// API endpoint URL
export const fetchAppliedJobs = async (userId: number |null, userToken: string|null , jobCounts : JobCounts | null): Promise<JobData[]> => {
  try {
    const applyJobsCount = jobCounts ?.appliedJobs ?? 300;
    const response = await apiClient.get(`/applyjob/getAppliedJobs/${userId}?page=${0}&size=${applyJobsCount}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('');
  }
};
 
 