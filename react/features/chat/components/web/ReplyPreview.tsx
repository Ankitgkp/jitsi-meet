import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IconCloseLarge } from '../../../base/icons/svg';
import ClickableIcon from '../../../base/ui/components/web/ClickableIcon';
import { setReplyMessage } from '../../actions.any';
import { IMessage } from '../../types';

interface IProps {

    /**
     * The message being replied to.
     */
    replyMessage: IMessage;
}

const useStyles = makeStyles()((theme) => {
    return {
        replyPreview: {
            background: theme.palette.ui02,
            border: `1px solid ${theme.palette.ui03}`,
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(2),
            margin: theme.spacing(1, 0),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        replyContent: {
            flex: 1,
            minWidth: 0
        },
        replyLabel: {
            ...theme.typography.labelBold,
            color: theme.palette.text02,
            fontSize: '0.75rem',
            marginBottom: theme.spacing(0.5)
        },
        replyText: {
            ...theme.typography.bodyShortRegular,
            color: theme.palette.text01,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '0.875rem'
        },
        closeButton: {
            marginLeft: theme.spacing(1),
            '&:hover': {
                backgroundColor: theme.palette.action.hover
            }
        }
    };
});

/**
 * A React component for showing a preview of the message being replied to.
 *
 * @param {IProps} props - The props of the component.
 * @returns {JSX.Element}
 */
export default function ReplyPreview({ replyMessage }: IProps): JSX.Element {
    const { classes } = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onCloseClick = () => {
        dispatch(setReplyMessage());
    };

    // Truncate long messages for preview
    const truncatedMessage = replyMessage.message.length > 100
        ? `${replyMessage.message.substring(0, 100)}...`
        : replyMessage.message;

    return (
        <div className={classes.replyPreview}>
            <div className={classes.replyContent}>
                <div className={classes.replyLabel}>
                    {t('chat.replyingTo', { displayName: replyMessage.displayName })}
                </div>
                <div className={classes.replyText}>
                    {truncatedMessage}
                </div>
            </div>
            <ClickableIcon
                accessibilityLabel={t('dialog.close')}
                className={classes.closeButton}
                icon={IconCloseLarge}
                onClick={onCloseClick}
            />
        </div>
    );
}