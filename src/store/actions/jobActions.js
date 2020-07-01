import axios from "axios";
import * as types from "./actionConstants";
import reverseGeocode from "latlng-to-zip";
import qs from "qs";
import config from "../../../config";

const JOB_ROOT_URL = "https://api.indeed.com/ads/apisearch?";

const JOB_QUERY_PARAMS = {
  publisher: "4201738803816157",
  format: "json",
  v: "2",
  latlong: 1,
  radius: 10,
  q: "javascript", //userInput
};

const data = [
  {
    jobtitle: "JavaScript Developer",
    company: "XYZ Corp.,",
    city: "Austin",
    state: "TX",
    country: "US",
    formattedLocation: "Austin, TX",
    source: "Dice",
    date: "Mon, 02 Aug 2017 16:21:00 GMT",
    snippet:
      "looking for an object-oriented Java Developer... Java Servlets, HTML, JavaScript, AJAX, Struts, Struts2, JSF) desirable. Familiarity with Tomcat and the Java...",
    url: "https://www.indeed.com/viewjob?jk=12345&indpubnum=8343699265155203",
    onmousedown: "indeed_clk(this, '0000');",
    latitude: 30.27127,
    longitude: -97.74103,
    jobkey: "123456",
    sponsored: false,
    expired: false,
    indeedApply: true,
    formattedLocationFull: "Austin, TX",
    formattedRelativeTime: "11 hours ago",
  },
  {
    jobtitle: " FullStack Senior JavaScript Developer",
    company: "LightBox",
    city: "Austin",
    state: "TX",
    country: "US",
    formattedLocation: "Austin, TX",
    source: "Dice",
    date: "Mon, 02 Aug 2017 16:21:00 GMT",
    snippet:
      "looking for an object-oriented Javascript Developer... Java Servlets, HTML, JavaScript, AJAX, Struts, Struts2, JSF) desirable. Familiarity with Tomcat and the Java...",
    url: "https://www.indeed.com/viewjob?jk=12345&indpubnum=8343699265155203",
    onmousedown: "indeed_clk(this, '0000');",
    latitude: 30.27127,
    longitude: -97.74103,
    jobkey: "12345",
    sponsored: false,
    expired: false,
    indeedApply: true,
    formattedLocationFull: "Austin, TX",
    formattedRelativeTime: "11 hours ago",
  },
  {
    jobtitle: "Senior Cloud Developer",
    company: "Amazon",
    city: "Austin",
    state: "TX",
    country: "US",
    formattedLocation: "Austin, TX",
    source: "Dice",
    date: "Mon, 02 Aug 2017 16:21:00 GMT",
    snippet:
      "looking for an object-oriented Javascript Developer... Java Servlets, HTML, JavaScript, AJAX, Struts, Struts2, JSF) desirable. Familiarity with Tomcat and the Java...",
    url: "https://www.indeed.com/viewjob?jk=12345&indpubnum=8343699265155203",
    onmousedown: "indeed_clk(this, '0000');",
    latitude: 30.27127,
    longitude: -97.74103,
    jobkey: "123457",
    sponsored: false,
    expired: false,
    indeedApply: true,
    formattedLocationFull: "Austin, TX",
    formattedRelativeTime: "10 days ago",
  },
];

const buildJobUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => {
  return async (dispatch) => {
    try {
      let zip = await reverseGeocode(region, config.GOOGLE_GEOLOCATION_KEY);
      const url = buildJobUrl(zip);
      //const { data } = await axios.get(url);
      dispatch({
        type: types.FETCH_JOBS,
        payload: data,
      });
      callback();
    } catch (err) {
      console.log(err);
    }
  };
};

export const likeJob = (job) => {
  return {
    type: types.LIKE_JOB,
    payload: job,
  };
};

export const clearLikedJobs = () => {
  return {
    type: types.CLEAR_LIKED_JOBS,
  };
};
