import React from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useAppliedJobsViewModel} from '@viewmodel/jobs/AppliedJob';
import {useAuth} from '@context/Authcontext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, JobData} from '@models/Model';
import JobCard from './Jobcard';
import {useLogos} from '../../hooks/useLogos';
import {DefaultLogoUrl} from '@components/constant';

const AppliedJobs = () => {
  const {userId, userToken} = useAuth();
  const {appliedJobs, loading, error} = useAppliedJobsViewModel(userId, userToken);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'AppliedJobs'>>();
  const {logos, loading: logosLoading}: {logos: {[key: number]: string}; loading: boolean} =
    useLogos(appliedJobs, userToken ?? '');

  const renderJobItem = ({item}: {item: JobData}) => (
    <TouchableOpacity onPress={() => navigation.navigate('JobDetailsScreen', {job: item})}>
      <JobCard
        jobTitle={item.jobTitle}
        companyName={item.companyname}
        location={item.location}
        minExperience={item.minimumExperience}
        maxExperience={item.maximumExperience}
        minSalary={item.minSalary}
        maxSalary={item.maxSalary}
        employeeType={item.employeeType}
        creationDate={item.creationDate}
        logoUrl={
          logos[item.id] === DefaultLogoUrl
            ? undefined // Use fallback for invalid Base64
            : logos[item.id] ?? undefined
        }
        truncateTitle={true}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Show loader until data is fully loaded */}
      {(loading || logosLoading) && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#FF8C00" />
        </View>
      )}

      {error && <Text style={styles.placeholderText}>{error}</Text>}

      {/* Render jobs if loading is complete and no error */}
      {!loading && !logosLoading && (
        <FlatList
          data={appliedJobs}
          renderItem={renderJobItem}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.5}
        />
      )}

      {/* Handle empty list */}
      {!loading && !logosLoading && appliedJobs.length === 0 && (
        <Text style={styles.placeholderText}>No applied jobs available!</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f6f6f6',
    top: 0,
    
  },
  oval: {
    flexDirection: 'row',
    alignItems: 'center',
    // Background color for the oval
    paddingHorizontal: 12,
    paddingVertical: 6,
    // Makes the container oval
    //marginBottom: 8,
    marginTop: -35,
    marginRight: 3
  },
  ovalText: {
    fontSize: 11,
    color: 'black',
    fontFamily: 'PlusJakartaSans-Medium'
  },
  Jobstext: {
    marginLeft: 22,
    marginBottom: 10,
    marginTop: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#0D0D0D',
  },
  jobstextcon: {
    backgroundColor: 'white'
  },
  brieficon: {
    height: 10,
    width: 12,
    marginRight: 8,
    marginLeft:8
  },
  briefcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 16,
  },
  rightAlignedText: {
    marginLeft: 20, // Adjust this value to set how far you want to move the text to the right
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    paddingHorizontal: 10,
    margin: 12,
    marginBottom: 0,
    //flexWrap:'nowrap'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
    fontFamily:'PlusJakartaSans-Bold'
  },
  jobDetails: {
    flex: 1,
 
 
  },
  jobTitle: {
    color: '#121212', // Text color
    fontFamily: 'PlusJakartaSans-Bold', // Custom font (ensure the font is properly linked)
    fontSize: 16, // Font size
    fontStyle: 'normal', // Font style
    lineHeight: 16, // Adjust line height as needed
    textTransform: 'capitalize', // Capitalize text
    flexWrap: 'nowrap'
  },
  companyName: {
    fontSize: 12,
    fontFamily: "PlusJakartaSans-Medium",
    fontStyle: 'normal',
    fontWeight: 600,
    color: 'rgba(83, 83, 83, 0.80)',
    marginVertical: 4,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    marginBottom: 12,
    marginTop: 6,
 
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  locationIcon: {
    width: 11,
    height: 12,
    marginRight: 6,
  },
  locationText: {
    fontSize: 11,
    color: 'black',
    fontFamily: 'PlusJakartaSans-Medium'
  },
  tag: {
    marginTop: -10,
    color: 'black',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    marginRight: 3,
    marginBottom: 8,
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Medium'
  },
  postedOn: {
    color: '#979696', // Text color
    fontFamily: 'PlusJakartaSans-Medium', // Custom font
    fontSize: 9, // Font size
    fontStyle: 'normal', // Font style
    marginLeft:'58%',
    lineHeight: 23.76, // Line height (in points, not percentage)
    marginTop:10,
    display:'flex'
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#F97316',
 
 
  },
  tabText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 10,
    fontFamily: 'PlusJakartaSans-Bold'
  },
  activeTabText: {
    color: '#F97316',
    marginLeft: 12,
    fontFamily: 'PlusJakartaSans-Bold'
 
  },
});
 
export default AppliedJobs;