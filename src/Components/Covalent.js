export const fetchBSCData = async () => {

      const res = await fetch(`https://api.pancakeswap.info/api/v2/tokens/0x4cf12dd46bab9afc94e049342fd75a9eaff5d096`,
      { 'stale-while-revalidate': 'max-age=604800' }
    );
    const { data } = await res.json();
    console.log(data.price)
    
}