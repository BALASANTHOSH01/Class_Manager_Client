import { getAttendanceByDate } from "../api/attendance/attendance.api";
import getInstituteId from "./getInstituteId";
import handleError from "./handleError";
import handleLoading from "./handleLoading";

const instituteId = getInstituteId();

const fetchAttendance = async (
  commonDispatch,
  setResponse,
  date
) => {
  try {
    handleLoading(commonDispatch, true);
    const response = await getAttendanceByDate(date, instituteId);
    setResponse(response);
  } catch (error) {
    handleError(commonDispatch, error, true);
  } finally {
    handleLoading(commonDispatch, false);
  }
};

export default fetchAttendance;
