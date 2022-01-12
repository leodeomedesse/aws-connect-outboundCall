
const AWS = require('aws-sdk');
var connect = new AWS.Connect();

exports.handler = (event) => {
    
    const {callIndex} = event;
    
    const response = {
    	ListOfAppeals: [
            {
              HearingInDays: 3,
              MobileNumber: '470-430-1230',
              TimeZone: 'PST',
              Language: 'English',
              AppealId: 'APL-334055',
              HearingDateTime: '01/07/2022 06:00 AM'
            },
            {
              HearingInDays: 7,
              MobileNumber: '470-430-1230',
              TimeZone: 'EST',
              Language: 'Spanish',
              AppealId: 'APL-334056',
              HearingDateTime: '01/11/2022 10:00 AM'
            }
          ]
    };
    
    if(response.ListOfAppeals.length > 0){
        
        const { MobileNumber, Language, HearingDateTime } = response.ListOfAppeals[callIndex];
        
        const DestinationPhoneNumber = "+1" + MobileNumber.replace(/-/g, '');
        const HearingDateTimeAux = HearingDateTime.replace(' ',', at ');
        
        var date = new Date(HearingDateTime);
        var HearingDateTime15 = new Date(date.setMinutes(date.getMinutes() - 15));
        HearingDateTime15 = HearingDateTime15.toString().substring(16, 21);
        
        var params = {
            ContactFlowId: "55427e2c-c648-4f73-b963-a71311ccb03b",
            DestinationPhoneNumber,
            InstanceId: "41aca699-c8ea-4751-aa01-683248c7995f",
            SourcePhoneNumber: "+13416003497",
            Attributes: {
                Language,
                HearingDateTime: HearingDateTimeAux,
                HearingDateTime15
            },
        };

        console.log('before -> ', params);
        connect.startOutboundVoiceContact(params, function (err, data) {
            console.log('initial');
            if (err) { console.log('Error', err.stack) }
            else { console.log('Success') }
        });
    }
};




