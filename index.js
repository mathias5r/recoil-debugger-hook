import React, { useEffect } from "react";
import {
  useRecoilSnapshot,
} from 'recoil';

import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.connect();

function useRecoilDebugger() {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
      if (__DEV__) {
        for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
          socket.emit('change', { key: node.key, payload: snapshot.getLoadable(node) });
        }
      }
    }, [snapshot]);
    return null;
}

export default useRecoilDebugger;