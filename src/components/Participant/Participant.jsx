/**
 * Copyright (c) [2015-2020] SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ParticipantActions from './ParticipantActions';
import { actionCreators as participantsActions } from '../../state/ducks/participants';
import { classNames, attachStream } from '../../utils/common';
import StreamsService from '../../utils/streams-service';
import { User as UserIcon } from 'react-feather';

import './Participant.css';

function setVideo(id, videoRef) {
  const stream = StreamsService.get(id);

  if (stream !== null) {
    console.log('Attaching media stream', id);
    attachStream(videoRef, stream);
  }
}

function toggleFocus(id, focus) {
  return focus === 'user' ? participantsActions.unsetFocus() : participantsActions.setFocus(id);
}

const Video = ({id, streamReady, isPublisher, isLocalScreen}) => {
  const videoRef = React.createRef();

  useEffect(() => setVideo(id, videoRef.current), [id, videoRef, streamReady]);

  return (
    <video
      ref={videoRef}
      muted={isPublisher}
      autoPlay
      className={classNames(
        isPublisher && !isLocalScreen && 'mirrored',
        "max-h-full"
      )}
    />
  );
};

const ParticipantVideo = React.memo(Video);

/**
 * @param props {object}
 * @param props.id {}
 * @param props.username {}
 * @param props.isPublisher {}
 * @param props.isLocalScreen {}
 * @param props.streamReady {}
 * @param props.focus {string?} null: no focus; 'auto': focus because speaking; 'user': focused by clicking
 * @param props.speaking {}
 * @param props.video {}
 */
function Participant({
  id,
  username,
  isPublisher,
  isLocalScreen,
  streamReady,
  focus,
  speaking,
  video
}) {
  const showVideo = (video || isLocalScreen) && !focus;
  const dispatch = useDispatch();

  return (
    <div
      className={classNames(
        'participant relative group bg-white',
        'transition duration-150 ease-in-out',
        focus || 'border-white',
        focus && 'border-secondary shadow-md',
        speaking && 'border-green-300'
      )}
      style={{width: "calc(var(--partSlotWidth) - 6px)", margin: "3px", padding: "4px", borderWidth: "2px"}}>
      <div
        className={classNames(
          "relative flex justify-evenly",
          showVideo ? "bg-primary-dark" : "bg-gray-100 hidden-video"
        )}
        style={{"height": "calc((var(--partSlotWidth) - 18px) * 0.75)"}}
        onClick={() => dispatch(toggleFocus(id, focus))}>
        <ParticipantVideo 
          id={id}
          streamReady={streamReady}
          isLocalScreen={isLocalScreen}
          isPublisher={isPublisher}
        />
        <UserIcon className={classNames('w-4/6 h-auto m-auto text-secondary', showVideo && 'hidden')} />
      </div>
      <div className="flex items-center p-1 bg-gray-200">
        <ParticipantActions participantId={id} />
        <div className="text-sm whitespace-no-wrap truncate">{username}</div>
      </div>
    </div>
  );
}

export default React.memo(Participant);
