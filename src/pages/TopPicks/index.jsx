import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Img, Line, List, Text } from "components";
import Footer from "components/Footer";
import { Link, useNavigate } from "react-router-dom";

const TopPicksPage = () => {
  const navigate = useNavigate();

  const [allBooks, setAllBooks] = useState([]);
  const isTopPick = true;

  useEffect(() => {
    axios
      .get("https://bookapi.cm.hmw.lol/api/books?page=3", {
        params: {
          is_top_pick: isTopPick.toString(),
        },
      })
      .then((response) => {
        const topPicksData = response.data.data.map((book, index) => ({
          ...book,
          label: index + 1,
        }));
        setAllBooks(topPicksData);
        console.log(topPicksData);
      })
      .catch((error) => {
        console.log("Error fetching top picks data: ", error);
      });
  }, [isTopPick]);

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
                className="bg-cover bg-no-repeat flex md:flex-1 flex-col h-[50px] items-start justify-end md:ml-[0] ml-[34px] md:mt-0 mt-[21px] p-[7px] w-[33%] md:w-full"
                style={{ backgroundImage: "url('images/img_group39.svg')" }}
              >
                <div className="flex flex-row gap-3.5 items-start justify-start ml-3.5 md:ml-[0] mt-1 w-[76%] md:w-full">
                  <Img
                    className="h-5 mt-0.5 w-5"
                    src="images/img_search.svg"
                    alt="search"
                  />
                  <Text className="text-gray-500" size="txtPoppinsLight20">
                    Search by title or authors...
                  </Text>
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
            <div className="bg-gray-100 flex flex-col items-start justify-end mt-[33px] p-[38px] sm:px-5 rounded-[15px]">
              <Text
                className="ml-8 md:ml-[0] mt-[7px] sm:text-[32px] md:text-[38px] text-[42px] text-gray-900"
                size="txtPoppinsSemiBold42Gray900"
              >
                Top Picks Collection
              </Text>
            </div>
            <List
              className="sm:flex-col flex-row md:gap-10 gap-16 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center mt-[77px] w-full"
              orientation="horizontal"
            >
              {allBooks
                .filter((book) => book.is_top_pick)
                .map((book, index) => (
                  <div
                    key={book.id}
                    className={`flex flex-1 flex-col items-start justify-start w-full ${
                      index === 2 ? "special-case-style" : ""
                    }`}
                  >
                    <div className="h-[340px] md:ml-[0] ml-[5px] relative w-[99%]">
                      <Img
                        className="h-[340px] m-auto object-cover rounded-lg w-full"
                        src={book.image_url}
                        alt="productphoto"
                      />
                      <div className="absolute bg-deep_purple-A200 flex flex-col items-end justify-start left-[0] p-[5px] rounded-br-[50px] rounded-tr-[50px] top-[9%]">
                        <Text
                          className="bg-white-A700 flex h-[30px] items-center justify-center rounded-[50%] text-[18.67px] text-center text-deep_purple-A200 w-[30px]"
                          size="txtPoppinsRegular1867DeeppurpleA200"
                        >
                          {book.label}
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full mt-2.5">
                      <Text
                        className="leading-[32.00px] md:ml-[0] ml-[5px] mt-2.5 text-2xl md:text-[22px] text-black-900 sm:text-xl w-[99%] sm:w-full"
                        size="txtPoppinsSemiBold24"
                      >
                        {book.title.length > 25
                          ? `${book.title.slice(0, 25)}...`
                          : book.title}
                      </Text>
                      <Text
                        className="md:ml-[0] ml-[5px] mt-2 text-black-900 text-xl"
                        size="txtPoppinsRegular20Black900"
                      >
                        by{" "}
                        {book.author.name.length > 5
                          ? `${book.author.name.slice(0, 5)}...`
                          : book.author.name}
                      </Text>
                      <Img
                        className="h-[25px] mt-[11px]"
                        src="images/img_group2903.svg"
                        alt="group2911"
                      />
                      <Button
                        className="cursor-pointer font-medium leading-[normal] min-w-[270px] mt-[43px] rounded-lg text-center text-xl"
                        shape="round"
                        color="deep_purple_A200"
                        size="sm"
                        variant="outline"
                      >
                        <Link to={`/single-book/${book.id}`}>Read Book</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              {/* <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="h-[340px] md:ml-[0] ml-[3px] relative w-[99%]">
                  <Img
                    className="h-[340px] m-auto object-cover rounded-lg w-full"
                    src="images/img_productphoto_2.png"
                    alt="productphoto"
                  />
                  <div className="absolute bg-deep_purple-A200 flex flex-col items-end justify-start left-[0] p-[5px] rounded-br-[50px] rounded-tr-[50px] top-[9%]">
                    <Text
                      className="bg-white-A700 flex h-[30px] items-center justify-center rounded-[50%] text-[18.67px] text-center text-deep_purple-A200 w-[30px]"
                      size="txtPoppinsRegular1867DeeppurpleA200"
                    >
                      2
                    </Text>
                  </div>
                </div>
                <Text
                  className="md:ml-[0] ml-[3px] mt-1.5 text-2xl md:text-[22px] text-black-900 sm:text-xl"
                  size="txtPoppinsSemiBold24"
                >
                  The Time Has Come
                </Text>
                <Text
                  className="md:ml-[0] ml-[3px] mt-[3px] text-black-900 text-xl"
                  size="txtPoppinsRegular20Black900"
                >
                  by Will Leitch
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
                  Read Book
                </Button>
              </div>
              <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="h-[340px] md:ml-[0] ml-[3px] relative w-[99%]">
                  <Img
                    className="h-[340px] m-auto object-cover rounded-lg w-full"
                    src="images/img_productphoto_3.png"
                    alt="productphoto"
                  />
                  <div className="absolute bg-deep_purple-A200 flex flex-col items-end justify-start left-[0] p-[5px] rounded-br-[50px] rounded-tr-[50px] top-[9%]">
                    <Text
                      className="bg-white-A700 flex h-[30px] items-center justify-center rounded-[50%] text-[18.67px] text-center text-deep_purple-A200 w-[30px]"
                      size="txtPoppinsRegular1867DeeppurpleA200"
                    >
                      3
                    </Text>
                  </div>
                </div>
                <Text
                  className="md:ml-[0] ml-[3px] mt-1.5 text-2xl md:text-[22px] text-black-900 sm:text-xl"
                  size="txtPoppinsSemiBold24"
                >
                  Under The Skin
                </Text>
                <Text
                  className="md:ml-[0] ml-[3px] mt-[3px] text-black-900 text-xl"
                  size="txtPoppinsRegular20Black900"
                >
                  by Linda Villarosa
                </Text>
                <Img
                  className="h-[25px] mt-[18px]"
                  src="images/img_group2903.svg"
                  alt="group2913"
                />
                <Button
                  className="cursor-pointer font-medium leading-[normal] min-w-[260px] md:ml-[0] ml-[3px] mt-[41px] rounded-lg text-center text-xl"
                  shape="round"
                  color="deep_purple_A200"
                  size="sm"
                  variant="outline"
                >
                  Read Book
                </Button>
              </div>
              <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="h-[340px] md:ml-[0] ml-[3px] relative w-[99%]">
                  <Img
                    className="h-[340px] m-auto object-cover rounded-lg w-full"
                    src="images/img_productphoto_4.png"
                    alt="productphoto"
                  />
                  <div className="absolute bg-deep_purple-A200 flex flex-col items-end justify-start left-[0] p-[5px] rounded-br-[50px] rounded-tr-[50px] top-[9%]">
                    <Text
                      className="bg-white-A700 flex h-[30px] items-center justify-center rounded-[50%] text-[18.67px] text-center text-deep_purple-A200 w-[30px]"
                      size="txtPoppinsRegular1867DeeppurpleA200"
                    >
                      4
                    </Text>
                  </div>
                </div>
                <Text
                  className="leading-[32.00px] md:ml-[0] ml-[3px] mt-2.5 text-2xl md:text-[22px] text-black-900 sm:text-xl w-[99%] sm:w-full"
                  size="txtPoppinsSemiBold24"
                >
                  (Forget a Mentor) Find a Sponsor
                </Text>
                <Text
                  className="md:ml-[0] ml-[3px] mt-[7px] text-black-900 text-xl"
                  size="txtPoppinsRegular20Black900"
                >
                  by Sylvia Ann Hewlett
                </Text>
                <Img
                  className="h-[25px] mt-[11px]"
                  src="images/img_group2903.svg"
                  alt="group2914"
                />
                <Button
                  className="cursor-pointer font-medium leading-[normal] min-w-[260px] md:ml-[0] ml-[3px] mt-3 rounded-lg text-center text-xl"
                  shape="round"
                  color="deep_purple_A200"
                  size="sm"
                  variant="outline"
                >
                  Read Book
                </Button>
              </div> */}
            </List>
            <div className="bg-deep_purple-A200 flex flex-col gap-[22px] items-center justify-start mt-[126px] p-11 md:px-10 sm:px-5 rounded-[15px] w-full">
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
                  className="bg-cover bg-no-repeat flex flex-col h-[50px] items-center justify-start p-3"
                  style={{
                    backgroundImage: "url('images/img_group39467.svg')",
                  }}
                >
                  <Text
                    className="text-base text-deep_purple-A200"
                    size="txtPoppinsMedium16DeeppurpleA200"
                  >
                    Submit
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <Footer className="flex font-dmsans items-center justify-center md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default TopPicksPage;
