import React, { useState, useEffect } from 'react';
import {
    NativeModules,
    PermissionsAndroid,
    FlatList,
    Platform,
    ActivityIndicator,
    Alert,
    Text} from 'react-native';
import Header from './Components/Header'
import ListItem from './Components/ListItem'

const { SmsReaderModule }: { SmsReader: SmsReaderModule } | any= NativeModules;
interface SmsReaderModule {
  readSms(): Promise<{ sender: string; body: string }[]>;
}


const requestSmsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: "SMS Read Permission",
            message: "This app needs access to your SMS messages to read them.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
};

const SmsScreen: React.FC = () => {
    const [listSmsAll, setListSmsAll] = useState<any>([]);
    const [listSms, setListSms] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const getPermissionAndFetchSms = async () => {
          const hasPermission = await requestSmsPermission();
          if (hasPermission) {
            fetchSms();
          } else {
            console.log("SMS permission denied");
          }
        };
        getPermissionAndFetchSms();
    }, []);

    


    // const requestReadSmsPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.READ_SMS,
    //           {
    //             title: 'SMS Permission',
    //             message: 'This app needs access to your SMS messages.',
    //             buttonNeutral: 'Ask Me Later',
    //             buttonNegative: 'Cancel',
    //             buttonPositive: 'OK',
    //           },
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
    //           await readSmsFunction()
    //         } else {
    //           console.log('Read SMS permission denied');
    //         }
    //       } catch (err) {
    //         console.warn(err);
    //       }
    //   };
      
    const fetchSms = async () => {
        if (loading) return;
        setLoading(true);
        try {
          const data = await SmsReaderModule.readSms();
          setListSmsAll(data)
          paginateData(data)
        } catch (error) {
          console.error(error);
          // Add user feedback for error
          Alert.alert("Failed to load SMS messages.");
        } finally {
          setLoading(false);
        }
    };

    const paginateData = (data:any) =>{
        setLoading(true);
        const start = (page - 1) * 20;
        const end = page * 20;
        const paginatedData = data.slice(start, end);
        if (paginatedData.length === 0) {
        setHasMore(false);
        } else {
        setListSms((prevData:any) => [...prevData, ...paginatedData]);
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(page > 1) paginateData(listSmsAll)
    }, [page])
    
    const loadMoreSms = () => {
        if (hasMore && !loading) {
          setPage(prevPage => prevPage + 1);
        }
    };


    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator size="large" style={{ margin: 20 }} />;
    };
    return (
        <>
        <Header getSms={fetchSms} count={listSmsAll.length}/>
        {listSmsAll.length === 0 && !loading ? <Text>No SMS messages found.</Text> :
        <FlatList
            data={listSms}
            renderItem={({item}:any)=>(  
                <ListItem title={item.sender}>
                  {item.body}
                </ListItem>
            )} 
            keyExtractor={(item, key) => JSON.stringify(key)} 
            ListFooterComponent={renderFooter}
            onEndReached={loadMoreSms}
            onEndReachedThreshold={0.5}
            extraData={listSms}
          /> 
        }
        </>
    );
};

export default SmsScreen;
