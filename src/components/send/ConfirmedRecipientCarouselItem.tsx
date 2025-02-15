import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import RecipientAvatar from '../RecipientAvatar'
import Colors from '../../common/Colors'
import ImageStyles from '../../common/Styles/ImageStyles'
import HeadingStyles from '../../common/Styles/HeadingStyles'
import Fonts from '../../common/Fonts'
import { RecipientDescribing } from '../../common/data/models/interfaces/RecipientDescribing'
import useFormattedUnitText from '../../utils/hooks/formatting/UseFormattedUnitText'
import { TEST_ACCOUNT } from '../../common/constants/wallet-service-types'
import BitcoinUnit from '../../common/data/enums/BitcoinUnit'
import { RFValue } from 'react-native-responsive-fontsize'
import { Satoshis } from '../../common/data/typealiases/UnitAliases'
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'


export type Props = {
  recipient: RecipientDescribing;
  accountKind: string;
  designatedAmount: Satoshis;
  containerStyle?: Record<string, unknown>;
};


const ConfirmedRecipientCarouselItem: React.FC<Props> = ( {
  recipient,
  accountKind,
  designatedAmount,
  containerStyle = {
  },
}: Props ) => {
  const unitText = useFormattedUnitText( {
    bitcoinUnit: accountKind == TEST_ACCOUNT ? BitcoinUnit.TSATS : BitcoinUnit.SATS,
  } )

  return (
    <View style={{
      ...styles.rootContainer, ...containerStyle
    }}>
      <RecipientAvatar
        recipient={recipient}
        contentContainerStyle={styles.avatarImage}
      />

      <View style={styles.textContentContainer}>
        <Text
          style={styles.recipientNameText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {recipient.displayedName}
        </Text>

        <Text
          style={styles.recipientBalanceText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {designatedAmount} {unitText}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create( {
  rootContainer: {
    alignItems: 'center',
    maxWidth: 120,
  },

  circledAvatarContainer: {
    ...ImageStyles.thumbnailImageMedium,
    ...ImageStyles.circledAvatarContainer,
    borderRadius: wp( 12 )/2,
  },

  avatarImage: {
    // ...ImageStyles.circledAvatarContainer,
    ...ImageStyles.thumbnailImageLarge,
    borderRadius: wp ( 14 )/2,
  },

  textContentContainer: {
    marginTop: 5,
  },

  recipientNameText: {
    color: Colors.textColorGrey,
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.FiraSansRegular,
    textAlign: 'center',
  },

  recipientBalanceText: {
    ...HeadingStyles.captionText,
    fontFamily: Fonts.FiraSansMediumItalic,
    color: Colors.blue,
    textAlign: 'center',
  },
} )

export default ConfirmedRecipientCarouselItem
