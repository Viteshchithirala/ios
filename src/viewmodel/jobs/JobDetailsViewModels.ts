import { useState, useEffect,useContext } from 'react';
import {  saveJob, applyJob, removeSavedJob } from '../../services/Jobs/JobDetails'; // Add removeSavedJob
import { useAuth } from '@context/Authcontext';
import Toast from 'react-native-toast-message';
import { fetchJobDetails,fetchCompanyLogo } from '@services/Jobs/RecommendedJobs';
import UserContext from '@context/UserContext';
import { Buffer } from 'buffer';
const useJobDetailsViewModel = (jobId: string) => {
  const { userToken, userId } = useAuth();
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [isJobApplied, setIsJobApplied] = useState(false);
  const [suggestedCourses, setSuggestedCourses] = useState<string[]>([]);
  const [percent, setPercent] = useState<number>(0);
  const [skillProgressText, setSkillProgressText] = useState<string | null>(null);
  const [perfectMatchSkills, setPerfectMatchSkills] = useState<string[]>([]);
  const [unmatchedSkills, setUnmatchedSkills] = useState<string[]>([]);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const { refreshJobCounts, setIsJobsLoaded } = useContext(UserContext)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const jobData = await fetchJobDetails(Number(jobId), userId, userToken);
 
        setSkillProgressText(jobData.matchStatus);
        setSuggestedCourses(jobData.sugesstedCourses);
 
        const matchPercentage = jobData.matchPercentage;
        const skillsRequired = jobData.skillsRequired.map(skill => skill.skillName.toUpperCase());
 
        setPerfectMatchSkills(jobData.matchedSkills.map((skill: any) => skill.skillName));
        setUnmatchedSkills(skillsRequired);
        setPercent(matchPercentage);
 
        // Fetch company logo
        if (jobData.recruiterId) {
          try {
            const logoData = await fetchCompanyLogo(jobData.recruiterId, userToken);
 
            if (logoData) {
              // Assuming logoData is an ArrayBuffer, convert it to Base64
              const base64Logo = logoData;
              console.log('Logo URL/Base64:', base64Logo);
              setCompanyLogo(base64Logo); // Set the Base64-encoded company logo
            } else {
              setCompanyLogo(null); // Set to null if no logo data is received
            }
          } catch (error) {
            console.error('Error fetching or converting company logo:', error);
            setCompanyLogo(null); // Default to null in case of an error
          }
        } else {
          setCompanyLogo(null); // Default if no recruiterId
        }
      }catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
 
    fetchProfileData();
  }, [jobId, userId, userToken]);
 
  const handleSaveJob = async () => {
    try {
      const result = await saveJob(Number(jobId), userId, userToken);
      if (result) {
        setIsJobSaved(true);
        setIsJobsLoaded(false);
        refreshJobCounts();
        Toast.show({
          type: 'success',
          text1: '',
          text2: 'Job saved successfully!',
          text1Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Bold', color: 'black' },
          text2Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Bold', color: 'black' },
          position: 'bottom',
          bottomOffset: 80,
          visibilityTime: 5000,
        });
      }
    } catch (error) {
      console.error('Error saving job:', error);
      Toast.show({
        type: 'error',
        text1: '',
        text2: 'Failed to save job.',
        text1Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Bold', color: 'black' },
        text2Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Bold', color: 'black' },
        position: 'bottom',
        bottomOffset: 80,
        visibilityTime: 5000,
      });
    }
  };
 
  const handleApplyJob = async () => {
    try {
      const result = await applyJob(userId, Number(jobId), userToken);
      if (result) {
        setIsJobApplied(true);
        setIsJobsLoaded(false);
        refreshJobCounts();
        Toast.show({
          type: 'success',
          text1: '',
          text2: 'Job application submitted successfully!',
          text1Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' },
          text2Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' },
          position: 'bottom',
          bottomOffset: 80,
          visibilityTime: 5000,
        });
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      Toast.show({
        type: 'error',
        text1: '',
        text2: 'Failed to apply for job.',
        text1Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' },
        text2Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' },
        position: 'bottom',
        bottomOffset: 80,
        visibilityTime: 5000,
      });
    }
  };
 
  const handleRemoveJob = async () => {
    try {
      const result = await removeSavedJob(Number(jobId), userId, userToken);
      if (result) {
        setIsJobSaved(false);
        setIsJobsLoaded(false);
        refreshJobCounts();
        Toast.show({
          type: 'success',
          position: 'bottom',
          bottomOffset: 80,
          text1: '',
          text2: 'Job removed successfully!',
          text1Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' },
          text2Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' },
          visibilityTime: 5000,
        });
      }
    } catch (error) {
      console.error('Error removing job:', error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        bottomOffset: 80,
        text1: '',
        text2: 'Failed to remove job.',
        text1Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' },
        text2Style: { fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' },
        visibilityTime: 5000,
      });
    }
  };
 
  return {
    isJobSaved,
    isJobApplied,
    suggestedCourses,
    percent,
    skillProgressText,
    perfectMatchSkills,
    unmatchedSkills,
    companyLogo,
    handleSaveJob,
    handleApplyJob,
    handleRemoveJob, // Expose the new function
  };
};
 
export default useJobDetailsViewModel;
 