import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Button } from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Colors from '../../common/Colors'
import Fonts from './../../common/Fonts'
import { RFValue } from 'react-native-responsive-fontsize'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ButtonStyles from '../../common/Styles/ButtonStyles'
import useCurrencyCode from '../../utils/hooks/state-selectors/UseCurrencyCode'
import MaterialCurrencyCodeIcon from '../../components/MaterialCurrencyCodeIcon'
import { getCurrencyImageByRegion, getCurrencyImageName } from '../../common/CommonFunctions'
import { LocalizationContext } from '../../common/content/LocContext'

function setCurrencyCodeToImage( currencyName, currencyColor ) {
  return (
    <View
      style={{
        marginRight: 5,
        marginBottom: wp( '0.7%' ),
      }}
    >
      <MaterialCommunityIcons
        name={currencyName}
        color={currencyColor == 'light' ? Colors.white : Colors.lightBlue}
        size={wp( '3.5%' )}
      />
    </View>
  )
}
export enum BottomSheetKind {
    TAB_BAR_BUY_MENU,
    TRUSTED_CONTACT_REQUEST,
    ADD_CONTACT_FROM_ADDRESS_BOOK,
    NOTIFICATIONS_LIST,
    SWAN_STATUS_INFO,
    WYRE_STATUS_INFO,
    RAMP_STATUS_INFO,
    ERROR,
    CLOUD_ERROR,
  }

export const materialIconCurrencyCodes = [
  'BRL',
  'BDT',
  'CNY',
  'JPY',
  'GBP',
  'KRW',
  'KZT',
  'RUB',
  'TRY',
  'INR',
  'ILS',
  'MNT',
  'NGN',
  'PHP',
  'EUR',
  'USD',
]

const HomeBuyCard = ( {
  cardContainer,
  amount,
  incramount,
  percentIncr,
  asset,
  openBottomSheet,
  //   netBalance,
  //   getCurrencyImageByRegion,
  //   exchangeRates,
  currencyCode,
} ) => {
//   const currencyKind: CurrencyKind = useCurrencyKind()
  const fiatCurrencyCode = useCurrencyCode()
  //   const prefersBitcoin = useMemo( () => {
  //     return currencyKind === CurrencyKind.BITCOIN
  //   }, [ currencyKind ] )
  const { translations, formatString } = useContext( LocalizationContext )
  const strings = translations[ 'home' ]
  return (
    <View
      style={cardContainer}
    >
      <View>
        <Text style={{
          color: Colors.blue,
          fontSize: RFValue( 11 ),
          // marginLeft: 2,
          fontFamily: Fonts.FiraSansRegular,
          alignSelf: 'flex-start',
          letterSpacing: 0.33
        }}>
          {formatString( strings.btcTo, fiatCurrencyCode )}
        </Text>
        <View style={{
          flexDirection: 'row', marginTop: hp( '1' ), alignItems: 'center'
        }}>
          {materialIconCurrencyCodes.includes( fiatCurrencyCode ) ? (
          // setCurrencyCodeToImage(
          //   getCurrencyImageName( CurrencyCode ),
          //   'light'
          // )
            <MaterialCurrencyCodeIcon
              currencyCode={fiatCurrencyCode}
              color={Colors.blue}
              size={wp( '3.5%' )}
              style={{
                width: wp( 4 )
              }}
            />
          ) : currencyCode.includes( currencyCode ) && (
            <Text style={{
              marginTop: hp( 0.5 )
            }}>
              {setCurrencyCodeToImage( getCurrencyImageName( currencyCode ), Colors.blue )}
            </Text>
          )}
          <Text>{amount ? amount : '--'}</Text>
          <Text>{incramount}</Text>
        </View>
      </View>
      <TouchableOpacity
        // icon={
        //   <Image
        //     source={require( '../../assets/images/icons/recurring_buy.png' )}
        //     style={{
        //       width: wp( 6 ),
        //       height: wp( 6 ),
        //       resizeMode: 'contain'
        //     }}
        //   />
        // }
        style={{
          borderRadius: wp( 2 ),
          paddingVertical: wp( 2.5 ),
          paddingHorizontal: wp( 4 ),
          backgroundColor: Colors.blue,
          shadowColor: Colors.shadowBlue,
          shadowOpacity: 1,
          shadowOffset: {
            width: 9, height: 10
          },
          elevation: 15
        }}
        onPress={() =>
          openBottomSheet( BottomSheetKind.TAB_BAR_BUY_MENU )
        }
      >
        <Text style={{
          ...ButtonStyles.floatingActionButtonText,
        }}>
          {strings.buy}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
// const styles = StyleSheet.create( {
//   titleStyle: {
//     color: Colors.blue,
//     fontSize: RFValue( 11 ),
//     letterSpacing: 0.33,
//     fontFamily: Fonts.FiraSansRegular,
//   },
//   subTitleStyle: {
//     color: Colors.gray8,
//     fontSize: RFValue( 9 ),
//   },
//   cardBitCoinImage: {
//     width: wp( '3.5%' ),
//     height: wp( '3.5%' ),
//     marginRight: 5,
//     resizeMode: 'contain',
//     marginBottom: wp( '0.7%' ),
//   },
// } )

export default HomeBuyCard
