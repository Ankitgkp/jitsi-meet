import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IconReply } from '../../../base/icons/svg';
import ClickableIcon from '../../../base/ui/components/web/ClickableIcon';
import { setReplyMessage } from '../../actions.any';
import { IMessage } from '../../types';

interface IProps {

    /**
     * The message being replied to.
     */
    message: IMessage;

    /**
     * Whether to show the reply button on the right.
     */
    showOnRight?: boolean;
}

const useStyles = makeStyles()((theme) => {
    return {
        replyButton: {
            '&:hover': {
                backgroundColor: theme.palette.action.hover
            }
        }
    };
});

/**
 * A React component for rendering a reply button.
 *
 * @param {IProps} props - The props of the component.
 * @returns {JSX.Element}
 */
export default function ReplyButton({ message, showOnRight }: IProps): JSX.Element {
    const { classes } = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onReplyClick = () => {
        dispatch(setReplyMessage(message));
    };

    return (
        <ClickableIcon
            accessibilityLabel = { t('chat.replyTo') }
            className = { classes.replyButton }
            icon = { IconReply }
            onClick = { onReplyClick } />
    );
}