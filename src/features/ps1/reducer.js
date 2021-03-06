import { clamp } from "../../utils/numbers";

export const ACTION_ADD = 'add';
export const ACTION_REMOVE = 'remove';
export const ACTION_MOVE = 'move';
export const ACTION_SET_COLOR = 'setColor';
export const ACTION_SET_SEGMENT = 'setSegment';
export const ACTION_SET_SEGMENT_CUSTOM = 'setSegmentCustom';
export const ACTION_SET_COLOR_PICKER_OPEN = 'setColorPickerOpen';
export const ACTION_SET_SEGMENT_PICKER_INDEX = 'setSegmentPickerIndex';
export const ACTION_SET_SEGMENT_DRAGGING_INDEX = 'setSegmentDraggingIndex';

export function reducer(state, action) {
  switch (action.type) {
    case ACTION_ADD: {
      let segments = [ ...state.segments ];
      segments.splice(action.index, 0, getNewSegment());

      return { ...state, segments };
    }
    case ACTION_REMOVE: {
      let segments = [ ...state.segments ];
      segments.splice(action.index, 1);

      return { ...state, segments };
    }
    case ACTION_MOVE: {
      let segments = [ ...state.segments ];
      const toIndexClamped = clamp(action.toIndex, 0, segments.length);

      segments.splice(toIndexClamped, 0, segments.splice(action.fromIndex, 1)[0]);

      return { ...state, segments };
    }
    case ACTION_SET_COLOR: {
      let segments = [ ...state.segments ];

      segments[action.index].color = action.color;

      return { ...state, segments };
    }
    case ACTION_SET_SEGMENT: {
      let segments = [ ...state.segments ];

      segments[action.index].id = action.segmentId;

      return {
        ...state,
        segments,
        segmentPickerIndex: null,
      };
    }
    case ACTION_SET_SEGMENT_CUSTOM: {
      let segments = [ ...state.segments ];

      segments[action.index].id = null;
      segments[action.index].customText = action.customText;

      return {
        ...state,
        segments,
        segmentPickerIndex: null,
      };
    }
    case ACTION_SET_COLOR_PICKER_OPEN: {
      let segments = [ ...state.segments ];

      segments[action.index].colorPickerOpen = action.isOpen;

      return { ...state, segments };
    }
    case ACTION_SET_SEGMENT_PICKER_INDEX: {
      return { ...state, segmentPickerIndex: action.index };
    }
    case ACTION_SET_SEGMENT_DRAGGING_INDEX: {
      return { ...state, draggingSegmentIndex: action.index };
    }
    default:
      return state;
  }
}

function getNewSegment() {
  return {
    color: 0,
    id: 'space',
    colorPickerOpen: false,
    customText: '',
  }
}

export const initialState = {
  segmentPickerIndex: null,
  draggingSegmentIndex: null,
  segments: [
    {
      color: 0,
      id: 'username',
    },
    {
      color: 90,
      id: 'space',
    },
    {
      color: 275,
      id: 'date',
    },
    {
      color: 90,
      id: 'space',
    },
    {
      color: 275,
      id: 'halfTime',
    },
    {
      color: 90,
      id: 'space',
    },
    {
      color: 90,
      id: 'pathToCurrentDirectory',
    },
    {
      color: 90,
      id: 'space',
    },
    {
      color: 180,
      id: 'gitStatus',
    },
    {
      color: 90,
      id: 'space',
    },
    {
      color: 180,
      customText: "👉",
    },
    {
      color: 0,
      id: 'space',
    },
  ],
};