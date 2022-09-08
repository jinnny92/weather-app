import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다
//2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태정보가 들어간다
//3. 5개의 버튼이 있다(1개는 현재 위치, 4개는 다른 도시의 정보가 있다)
//4. 도시버튼을 클릭할 떄 마다 도시별 날씨가 나온다
//5. 현재 위치 버튼을 누르면 다시 현재위치기반의날씨가 나온다
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["seoul", "tokyo", "hongkong", "new york", "paris", "madrid"];
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    //여기서 현재 위치 기반 날씨를 보여줄 것임
    //그러기 위해 현재 위치를 가져올것이다
    //navigator라는 자바스크립트에서 주어진 기본 객체를 가져온다 그 안에 geolocation라는 객체가 있고, 이 안에 또 getCurrentPosition라는 함수가 있다 getCurrentPosition안에 function이 들어간다
    navigator.geolocation.getCurrentPosition((position) => {
      //매개변수 안에 바로 익명의 함수 만들기()=>{}형태
      //position이라는 매개변수 꼭 넣어줘야함 여기서 데이터가 오기 때문에
      let lat = position.coords.latitude; //위도
      let lon = position.coords.longitude; //경도
      //이 함수를 통해 lat, lon정보를 가져와서 getWeatherByCurrentLocation에 뿌려주기 위해 getWeatherByCurrentLocation항수를 호출하고 매개변수에 lat, lon넣어서 정보를 넣어줬음
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    //다이나믹한 value는 ${}를 사용
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7da855e131bffe46cfdf99679fd7bebd&units=metric`;

    setLoading(true);
    //await 기다리다  fetch하는 것을 뭘 fetch하냐 url을, 이 url에 데이터를 가져와서 fetch할때까지 기다리고, 그 값을 response에 넣는다는 뜻
    //await함수를 쓰고싶으면 async함수여야 한다, 비동기적으로 처리하려고
    //기다리는것 -> 비동기방식
    let response = await fetch(url);

    //위의 reponse를 통해 json을 추출, 대부분 api는 json. json을 추출해야 데이터를 볼 수 있다
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7da855e131bffe46cfdf99679fd7bebd&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]); //[]배열 안에 아무것도 안들어있으면 랜더 후에 바로 실행이 된다(componentDidMount()처럼 발동)

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      )}
    </div>
  );
}

export default App;
