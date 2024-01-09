import axios from "axios";
import { Button, Img, Line, List, Text } from "components";
import Footer from "components/Footer";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home1Page = () => {
  const navigate = useNavigate();

  const [highestRatedData, setHighestRatedData] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://bookapi.cm.hmw.lol/api/books/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        // If search results exist, navigate to the search results page
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      } else {
        // If no search results, navigate to the 404 search page
        navigate("/search404");
      }
    } catch (error) {
      console.error("Search API error:", error);
      navigate("/search404");
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://bookapi.cm.hmw.lol/api/books?page=2?sort=rating&direction=desc"
      )
      .then((response) => {
        const sortedData = response.data.data.sort(
          (a, b) => b.rating - a.rating
        );
        const highestRatedBook = sortedData[0];
        setHighestRatedData([highestRatedBook]);
        console.log(highestRatedBook);
      })
      .catch((error) => {
        console.log("Error fetching highest-rated data: ", error);
      });

    axios
      .get("https://bookapi.cm.hmw.lol/api/books?page=1")
      .then((response) => {
        const allBooksData = response.data.data;
        setAllBooks(allBooksData);
        console.log(allBooksData);
      })
      .catch((error) => {
        console.log("Error fetching all books data: ", error);
      });
  }, []);

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-center justify-end mx-auto py-[30px] w-full">
        <div className="flex flex-col gap-[41px] items-center justify-start w-full">
          <div className="flex flex-col items-center justify-start max-w-[1246px] mx-auto md:px-5 w-full">
            <header className="flex md:flex-col flex-row md:gap-5 items-center justify-center w-full">
              <div className="flex md:flex-1 flex-row gap-[11px] items-end justify-between w-[19%] md:w-full">
                <Button
                  className="flex h-[58px] items-center justify-center mt-[13px] w-[58px]"
                  shape="round"
                  color="deep_purple_A200"
                  size="sm"
                  variant="fill"
                >
                  <Img src="images/img_settings.svg" alt="settings" />
                </Button>
                <div className="flex flex-col items-center justify-start">
                  <Text
                    className="sm:text-[31px] md:text-[37px] text-[41px] text-gray-900"
                    size="txtPoppinsMedium41"
                  >
                    Bookoe
                  </Text>
                  <Text
                    className="text-gray-900 text-sm"
                    size="txtPoppinsLight14"
                  >
                    Rekomendasi Bukumu
                  </Text>
                </div>
              </div>
              <ul className="flex md:flex-1 flex-row gap-6 sm:hidden items-start justify-center mb-2 md:ml-[0] ml-[200px] md:mt-0 mt-8 w-[19%] md:w-full common-row-list">
                <li>
                  <a
                    href=""
                    className="hover:font-semibold text-gray-900 text-xl "
                    onClick={() => navigate("/")}
                  >
                    <Text size="txtPoppinsRegular20">All</Text>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="hover:font-semibold text-gray-900 hover:text-gray-900 text-xl "
                    onClick={() => navigate("/latest")}
                  >
                    <Text size="txtPoppinsRegular20">Latest</Text>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="hover:font-semibold text-gray-900 hover:text-gray-900 text-xl "
                    onClick={() => navigate("/toppicks")}
                  >
                    <Text size="txtPoppinsRegular20">Top Picks</Text>
                  </a>
                </li>
              </ul>
              <div
                className="bg-cover bg-no-repeat flex md:flex-1 flex-col h-[50px] items-start justify-end md:ml-[0] ml-[37px] md:mt-0 mt-[21px] p-[7px] w-[33%] md:w-full"
                style={{ backgroundImage: "url('images/img_group39.svg')" }}
              >
                <div className="flex flex-row gap-2.5 items-start justify-start md:ml-[0] ml-[3px] mt-1 w-[76%] md:w-full">
                  <Img
                    className="h-8 mt-0.5 w-5"
                    src="images/img_search.svg"
                    alt="search"
                  />
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      className="text-gray-500 border-none outline-none w-full"
                      placeholder="Search by title or author"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                  </form>
                </div>
              </div>
              <Button
                className="cursor-pointer font-medium leading-[normal] min-w-[135px] ml-4 md:ml-[0] md:mt-0 mt-[21px] rounded-lg text-center text-xl"
                shape="round"
                color="deep_purple_A200"
                size="sm"
                variant="outline"
              >
                Edit List
              </Button>
            </header>
            {highestRatedData.map((item) => (
              <div className="bg-gray-100 flex md:flex-col flex-row md:gap-10 items-center justify-between mt-[33px] p-[65px] md:px-10 sm:px-5 rounded-[15px] w-full">
                <div className="flex md:flex-1 flex-col items-center justify-start md:ml-[0] ml-[5px] w-[48%] md:w-full m-6">
                  <div className="flex flex-col items-start justify-start w-full">
                    <Text
                      className="md:ml-[0] ml-[3px] text-deep_purple-A200 text-xl"
                      size="txtPoppinsSemiBold20DeeppurpleA200"
                    >
                      MUST READ
                    </Text>
                    <Text
                      className="leading-[72.00px] mt-2 md:text-5xl text-[62px] text-gray-900"
                      size="txtPoppinsSemiBold62"
                    >
                      {item.title}
                    </Text>
                    <div className="flex flex-row gap-2.5 items-start justify-start md:ml-[0] ml-[3px] mt-3.5 w-[49%] md:w-full">
                      <Text
                        className="mt-0.5 text-base text-black-900"
                        size="txtPoppinsMedium16"
                      >
                        by {item.author.name}
                      </Text>
                      <Text className="">{item.rating}</Text>
                    </div>
                    <Text
                      className="md:ml-[0] ml-[3px] mt-[29px] text-base text-black-900 w-[85%] sm:w-full"
                      size="txtPoppinsRegular16"
                    >
                      {item.synopsis}
                    </Text>
                  </div>
                  <div className="flex sm:flex-col flex-row gap-[15px] items-center justify-between md:ml-[0] ml-[3px] mt-4 w-full">
                    <Button
                      className="cursor-pointer flex items-center justify-center min-w-[193px] rounded-lg"
                      rightIcon={
                        <div className="mt-2 mb-1.5 ml-[13px] bg-white-A700">
                          {/* <Img
                            // src="images/img_arrowleft.svg"
                            alt="arrow_left"
                          /> */}
                        </div>
                      }
                      shape="round"
                      color="deep_purple_A200"
                      size="sm"
                      variant="fill"
                    >
                      <div className="font-medium leading-[normal] text-left text-xl">
                        <Link to={`/single-book/${item.id}`}>Read Book</Link>
                      </div>
                    </Button>
                    <Button
                      className="cursor-pointer font-medium leading-[normal] min-w-[314px] rounded-lg text-center text-xl"
                      shape="round"
                      color="deep_purple_A200"
                      size="sm"
                      variant="outline"
                    >
                      <Link to={`/toppicks`}>See All Recomendation</Link>
                    </Button>
                  </div>
                </div>
                <div className="h-[390px] mr-1.5 relative w-[37%] md:w-full ">
                  <div className="absolute h-[327px] inset-y-[0] my-auto right-[0] w-[70%]">
                    <Img
                      className="absolute h-[272px] inset-y-[0] my-auto object-cover right-[0] rounded-[10px] w-[70%]"
                      src={item.image_url}
                      alt="productphoto"
                    />
                    <Img
                      className="absolute h-[327px] inset-y-[0] left-[0] my-auto object-cover rounded-[10px] w-[84%]"
                      src={item.image_url}
                      alt="productphoto_One"
                    />
                    <Img
                      className="absolute h-[390px] inset-y-[0] left-[0] my-auto object-cover rounded-[10px] w-[69%]"
                      src={item.image_url}
                      alt="productphoto_Two"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:gap-5 gap-[114px] grid md:grid-cols-1 grid-cols-2 justify-center min-h-[auto] mt-[114px] w-full">
            {allBooks
              .filter((book) => book.id === 1070)
              .map((book) => (
                <div className="flex flex-1 flex-col items-center justify-start w-full">
                  <div className="flex sm:flex-col flex-row gap-4 items-center justify-between w-full p-3">
                    <Img
                      className="h-[346px] md:h-auto object-cover rounded-lg"
                      src={book.image_url}
                      alt={book.title}
                    />
                    <div className="flex flex-col items-start justify-start">
                      <Text
                        className="text-2xl md:text-[22px] text-black-900 sm:text-xl"
                        size="txtPoppinsSemiBold24"
                      >
                        {book.title}
                      </Text>
                      <Text
                        className="text-black-900 text-center text-xl"
                        size="txtPoppinsRegular20Black900"
                      >
                        by {book.author.name}
                      </Text>
                      <div className="flex flex-row gap-2 items-center justify-start mt-[13px] w-[65%] md:w-full">
                        <Text
                          className="bg-yellow-800 flex h-[41px] items-center justify-center rounded-[20px] text-base text-center text-white-A700 w-[41px]"
                          size="txtPoppinsRegular16WhiteA700"
                        >
                          {book.rating}
                        </Text>
                        <Img
                          className="h-[25px]"
                          src="images/img_group2903.svg"
                          alt="group2915"
                        />
                      </div>
                      <Text
                        className="mt-[27px] text-base text-gray-900 w-full"
                        size="txtPoppinsRegular16Gray900"
                      >
                        {book.synopsis}
                      </Text>
                      <Button
                        className="cursor-pointer font-medium leading-[normal] min-w-[270px] mt-[29px] rounded-lg text-center text-xl"
                        shape="round"
                        color="deep_purple_A200"
                        size="sm"
                        variant="outline"
                      >
                        <Link to={`/single-book/${book.id}`}>Read Book</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            {allBooks
              .filter((book) => book.id === 1461)
              .map((book) => (
                <div className="flex flex-1 flex-col items-center justify-start w-full">
                  <div className="flex sm:flex-col flex-row gap-4 items-center justify-between w-full">
                    <Img
                      className="h-[346px] md:h-auto object-cover rounded-lg"
                      src={book.image_url}
                      alt={book.title}
                    />
                    <div className="flex flex-col items-start justify-start">
                      <Text
                        className="leading-[32.00px] text-2xl md:text-[22px] text-black-900 sm:text-xl w-full"
                        size="txtPoppinsSemiBold24"
                      >
                        {book.title}
                      </Text>
                      <Text
                        className="mt-1 text-black-900 text-center text-xl"
                        size="txtPoppinsRegular20Black900"
                      >
                        by {book.author.name}
                      </Text>
                      <div className="flex flex-row gap-2 items-center justify-start mt-[18px] w-[65%] md:w-full">
                        <Text
                          className="bg-yellow-800 flex h-[41px] items-center justify-center rounded-[20px] text-base text-center text-white-A700 w-[41px]"
                          size="txtPoppinsRegular16WhiteA700"
                        >
                          {book.rating}
                        </Text>
                        <Img
                          className="h-[25px]"
                          src="images/img_group2903.svg"
                          alt="group2903"
                        />
                      </div>
                      <Text
                        className="mt-[31px] text-base text-gray-900 w-full"
                        size="txtPoppinsRegular16Gray900"
                      >
                        {book.synopsis}
                      </Text>
                      <Button
                        className="cursor-pointer font-medium leading-[normal] min-w-[270px] mt-[29px] rounded-lg text-center text-xl"
                        shape="round"
                        color="deep_purple_A200"
                        size="sm"
                        variant="outline"
                      >
                        <Link to={`/single-book/${book.id}`}>Read Book</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            {allBooks
              .filter((book) => book.id === 878)
              .map((book) => (
                <div className="flex flex-1 flex-col items-center justify-start w-full">
                  <div className="flex sm:flex-col flex-row gap-[15px] items-center justify-between w-full p-3">
                    <Img
                      className="h-[346px] md:h-auto object-cover rounded-lg"
                      src={book.image_url}
                      alt="rectangleOne"
                    />
                    <div className="flex flex-col items-start justify-start">
                      <Text
                        className="text-2xl md:text-[22px] text-black-900 sm:text-xl"
                        size="txtPoppinsSemiBold24"
                      >
                        {book.title}
                      </Text>
                      <Text
                        className="text-black-900 text-xl w-full"
                        size="txtPoppinsRegular20Black900"
                      >
                        by {book.author.name}
                      </Text>
                      <div className="flex flex-row gap-2 items-center justify-start mt-[15px] w-[65%] md:w-full">
                        <Text
                          className="bg-yellow-800 flex h-[41px] items-center justify-center rounded-[20px] text-base text-center text-white-A700 w-[41px]"
                          size="txtPoppinsRegular16WhiteA700"
                        >
                          {book.rating}
                        </Text>
                        <Img
                          className="h-[25px]"
                          src="images/img_group2903.svg"
                          alt="group2907"
                        />
                      </div>
                      <Text
                        className="mt-[38px] text-base text-gray-900 w-full"
                        size="txtPoppinsRegular16Gray900"
                      >
                        {book.synopsis}
                      </Text>
                      <Button
                        className="cursor-pointer font-medium leading-[normal] min-w-[270px] mt-[29px] rounded-lg text-center text-xl"
                        shape="round"
                        color="deep_purple_A200"
                        size="sm"
                        variant="outline"
                      >
                        <Link to={`/single-book/${book.id}`}>Read Book</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            {allBooks
              .filter((book) => book.id === 1346)
              .map((book) => (
                <div className="flex flex-1 flex-col items-center justify-start w-full">
                  <div className="flex sm:flex-col flex-row gap-4 items-center justify-between w-full">
                    <Img
                      className="h-[346px] md:h-auto object-cover rounded-lg"
                      src={book.image_url}
                      alt="productphoto"
                    />
                    <div className="flex flex-col items-start justify-start">
                      <Text
                        className="text-2xl md:text-[22px] text-black-900 sm:text-xl"
                        size="txtPoppinsSemiBold24"
                      >
                        {book.title}
                      </Text>
                      <Text
                        className="mt-[3px] text-black-900 text-xl"
                        size="txtPoppinsRegular20Black900"
                      >
                        by {book.author.name}
                      </Text>
                      <div className="flex flex-row gap-2 items-center justify-start mt-[17px] w-[65%] md:w-full">
                        <Text
                          className="bg-yellow-800 flex h-[41px] items-center justify-center rounded-[20px] text-base text-center text-white-A700 w-[41px]"
                          size="txtPoppinsRegular16WhiteA700"
                        >
                          {book.rating}
                        </Text>
                        <Img
                          className="h-[25px]"
                          src="images/img_group2903.svg"
                          alt="group2909"
                        />
                      </div>
                      <Text
                        className="mt-[23px] text-base text-gray-900 w-full"
                        size="txtPoppinsRegular16Gray900"
                      >
                        {book.synopsis}
                      </Text>
                      <Button
                        className="cursor-pointer font-medium leading-[normal] min-w-[270px] mt-[29px] rounded-lg text-center text-xl"
                        shape="round"
                        color="deep_purple_A200"
                        size="sm"
                        variant="outline"
                      >
                        <Link to={`/single-book/${book.id}`}>Read Book</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <List
            className="sm:flex-col flex-row md:gap-10 gap-16 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center mt-[113px] w-full p-3"
            orientation="horizontal"
          >
            {allBooks
              .filter((book) => book.id === 2074)
              .map((book) => (
                <div className="flex flex-1 flex-col items-start justify-start w-full">
                  <Img
                    className="h-[340px] md:h-auto md:ml-[0] ml-[3px] object-cover rounded-lg w-[99%] sm:w-full"
                    src={book.image_url}
                    alt="productphoto"
                  />
                  <Text
                    className="leading-[32.00px] md:ml-[0] ml-[5px] mt-2.5 text-2xl md:text-[22px] text-black-900 sm:text-xl w-[99%] sm:w-full"
                    size="txtPoppinsSemiBold24"
                  >
                    {book.title}
                  </Text>
                  <Text
                    className="md:ml-[0] ml-[5px] mt-2 text-black-900 text-xl"
                    size="txtPoppinsRegular20Black900"
                  >
                    by {book.author.name}
                  </Text>
                  <Img
                    className="h-[25px] mt-[11px]"
                    src="images/img_group2903.svg"
                    alt="group2911"
                  />
                  <Button
                    className="cursor-pointer font-medium leading-[normal] min-w-[260px] md:ml-[0] ml-[3px] mt-[42px] rounded-lg text-center text-xl"
                    shape="round"
                    color="deep_purple_A200"
                    size="sm"
                    variant="outline"
                  >
                    <Link to={`/single-book/${book.id}`}>Read Book</Link>
                  </Button>
                </div>
              ))}
            {allBooks
              .filter((book) => book.id === 2028)
              .map((book) => (
                <div className="flex flex-1 flex-col items-start justify-start w-full">
                  <Img
                    className="h-[340px] md:h-auto md:ml-[0] ml-[3px] object-cover rounded-lg w-[99%] sm:w-full"
                    src={book.image_url}
                    alt="productphoto"
                  />
                  <Text
                    className="md:ml-[0] ml-[3px] mt-1.5 text-2xl md:text-[22px] text-black-900 sm:text-xl"
                    size="txtPoppinsSemiBold24"
                  >
                    {book.title}
                  </Text>
                  <Text
                    className="md:ml-[0] ml-[3px] mt-[3px] text-black-900 text-xl"
                    size="txtPoppinsRegular20Black900"
                  >
                    by {book.author.name}
                  </Text>
                  <Img
                    className="h-[25px] mt-[17px]"
                    src="images/img_group2903.svg"
                    alt="group2912"
                  />
                  <Button
                    className="cursor-pointer font-medium leading-[normal] min-w-[260px] md:ml-[0] ml-[3px] mt-[42px] rounded-lg text-center text-xl"
                    shape="round"
                    color="deep_purple_A200"
                    size="sm"
                    variant="outline"
                  >
                    <Link to={`/single-book/${book.id}`}>Read Book</Link>
                  </Button>
                </div>
              ))}
            {allBooks
              .filter((book) => book.id === 996)
              .map((book) => (
                <div className="flex flex-1 flex-col items-start justify-start w-full">
                  <Img
                    className="h-[340px] md:h-auto md:ml-[0] ml-[3px] object-cover rounded-lg w-[99%] sm:w-full"
                    src={book.image_url}
                    alt="productphoto"
                  />
                  <Text
                    className="md:ml-[0] ml-[3px] mt-1.5 text-2xl md:text-[22px] text-black-900 sm:text-xl"
                    size="txtPoppinsSemiBold24"
                  >
                    {book.title}
                  </Text>
                  <Text
                    className="md:ml-[0] ml-[3px] mt-[3px] text-black-900 text-xl"
                    size="txtPoppinsRegular20Black900"
                  >
                    by {book.author.name}
                  </Text>
                  <Img
                    className="h-[25px] mt-[18px]"
                    src="images/img_group2903.svg"
                    alt="group2913"
                  />
                  <Button
                    className="cursor-pointer font-medium leading-[normal] min-w-[260px] md:ml-[0] ml-[3px] mt-[42px] rounded-lg text-center text-xl"
                    shape="round"
                    color="deep_purple_A200"
                    size="sm"
                    variant="outline"
                  >
                    <Link to={`/single-book/${book.id}`}>Read Book</Link>
                  </Button>
                </div>
              ))}
            {allBooks
              .filter((book) => book.id === 1820)
              .map((book) => (
                <div className="flex flex-1 flex-col items-start justify-start w-full">
                  <Img
                    className="h-[340px] md:h-auto md:ml-[0] ml-[3px] object-cover rounded-lg w-[99%] sm:w-full"
                    src={book.image_url}
                    alt="productphoto"
                  />
                  <Text
                    className="leading-[32.00px] md:ml-[0] ml-[3px] mt-2.5 text-2xl md:text-[22px] text-black-900 sm:text-xl w-[99%] sm:w-full"
                    size="txtPoppinsSemiBold24"
                  >
                    {book.title}
                  </Text>
                  <Text
                    className="md:ml-[0] ml-[3px] mt-[7px] text-black-900 text-xl"
                    size="txtPoppinsRegular20Black900"
                  >
                    by {book.author.name}
                  </Text>
                  <Img
                    className="h-[25px] mt-[11px]"
                    src={"images/img_group2903.svg"}
                    alt="group2914"
                  />
                  <Button
                    className="cursor-pointer font-medium leading-[normal] min-w-[260px] md:ml-[0] ml-[3px] mt-[42px] rounded-lg text-center text-xl"
                    shape="round"
                    color="deep_purple_A200"
                    size="sm"
                    variant="outline"
                  >
                    <Link to={`/single-book/${book.id}`}>Read Book</Link>
                  </Button>
                </div>
              ))}
          </List>
          <div className="bg-deep_purple-A200 flex flex-col gap-[22px] items-center justify-start mt-[107px] p-11 m-6 md:px-10 sm:px-5 rounded-[15px] ">
            <Text
              className="sm:text-[32px] md:text-[38px] text-[42px] text-center text-white-A700 w-[69%] sm:w-full"
              size="txtPoppinsSemiBold42"
            >
              Join our newsletter to get our latest recommendation!
            </Text>
            <div className="flex sm:flex-col flex-row gap-2 items-center justify-center mb-[17px] w-2/5 md:w-full">
              <div
                className="bg-cover bg-no-repeat flex flex-col h-[50px] items-start justify-end p-2.5 w-[77%] sm:w-full"
                style={{
                  backgroundImage: "url('images/img_group39466.svg')",
                }}
              >
                <div className="flex flex-row gap-3 items-start justify-start ml-2 md:ml-[0] mt-1 w-[52%] md:w-full">
                  <Img className="h-5" src="images/img_lock.svg" alt="lock" />
                  <Text
                    className="text-base text-gray-600"
                    size="txtPoppinsLight16"
                  >
                    Enter your email
                  </Text>
                </div>
              </div>
              <div
                className="bg-cover bg-no-repeat flex flex-col h-[50px] items-center justify-start"
                style={{
                  backgroundImage: "url('images/img_group39467.svg')",
                }}
              >
                <Text
                  className="text-deep_purple-A200 rounded-lg m-3 p-1"
                  size="txtPoppinsMedium16DeeppurpleA200"
                >
                  Submit
                </Text>
              </div>
            </div>
          </div>
        </div>
        <Footer className="flex font-dmsans items-center justify-center md:px-5 " />
      </div>
    </>
  );
};
export default Home1Page;
