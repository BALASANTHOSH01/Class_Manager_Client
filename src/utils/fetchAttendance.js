import { getAttendanceByDate } from "../api/attendance/attendance.api";
import getInstituteId from "./getInstituteId";
import handleError from "./handleError";
import handleLoading from "./handleLoading";

const fetchAttendance = async (commonDispatch, setResponse, date) => {
  try {
    handleLoading(commonDispatch, true);
    const instituteId = getInstituteId(); // Ensure instituteId is obtained inside the function
    const response = await getAttendanceByDate(date, instituteId);
    setResponse(Array.isArray(response) ? response : []);
  } catch (error) {
    handleError(commonDispatch, error, true);
    setResponse([]); // Ensure an array is set even in case of an error
  } finally {
    handleLoading(commonDispatch, false);
  }
};

export default fetchAttendance;
