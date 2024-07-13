export const staffInitialState = {
  staffData: {
    name: "",
    email: "",
    password: "",
    department: "",
    phoneNumber: "",
    institute: "",
  },
  staffCreated: false,
  searchStaff: "",
};

export const SET_STAFF_DATA = "SET_STAFF_DATA";
export const SET_INSTITUTE_ID = "SET_INSTITUTE_ID";
export const SET_STAFF_CREATED = "SET_STAFF_CREATED";
export const SET_SEARCH_STAFF = "SET_SEARCH_STAFF";

export const staffReducer = (state, action) => {
  switch (action.type) {
    case SET_STAFF_DATA:
      return {
        ...state,
        staffData: {
          ...state.staffData,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_STAFF_CREATED:
      return { ...state, staffCreated: action.payload };
    case SET_SEARCH_STAFF:
      return { ...state, searchStaff: action.payload };
    case SET_INSTITUTE_ID:
      return {
        ...state,
        staffData: {
          ...state.staffData,
          institute: action.payload,
        },
      };
    default:
      return state;
  }
};
