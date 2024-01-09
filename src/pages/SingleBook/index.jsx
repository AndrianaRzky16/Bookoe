import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Img, Text } from "components";
import Footer from "components/Footer";
import Header from "components/Header";

const SingleBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`https://bookapi.cm.hmw.lol/api/books/${id}`).then((response) => {
      const bookData = response.data;
      setBook(bookData);
      console.log(bookData);
    });
  }, [id]);

  if (!book) {
    return <div></div>;
  }

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-center justify-end mx-auto py-[26px] w-full">
        <div className="flex flex-col gap-[41px] items-center justify-start mt-[5px] w-full">
          <div className="flex flex-col items-center justify-start max-w-[1241px] mx-auto md:px-5 w-full">
            <Header className="flex md:flex-col flex-row md:gap-5 items-center justify-center w-full" />
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[72px] w-full">
              <Img
                className="h-[587px] md:h-auto mb-2 object-cover rounded-[14px]"
                src={book.image_url}
                alt="productphoto"
              />
              <div className="flex flex-col items-start justify-start md:mt-0 mt-[59px] w-[65%] md:w-full">
                <Text
                  className="text-left md:text-5xl ml-[25px] text-[50px] text-gray-900"
                  size="txtPoppinsSemiBold62"
                >
                  {book.title}
                </Text>
                <Text
                  className="text-left md:text-5xl ml-[25px] text-[25px] text-gray-900 m-5 h-3"
                  size="txtPoppinsRegular20Black900"
                >
                  by {book.author.name}
                </Text>

                <div className="flex flex-row gap-[9px] items-center justify-start p-6">
                  <Text
                    className="bg-yellow-800 flex h-[55px] items-center justify-center rounded-[27px] sm:text-[17.53px] md:text-[19.53px] text-[21.53px] text-white-A700 w-[55px]"
                    size="txtPoppinsRegular2153"
                  >
                    {book.rating}
                  </Text>
                  {/* <Img
                    className="h-[55px]"
                    src="images/img_group2903.svg"
                    alt="group2911"
                  /> */}
                </div>
                <Text
                  className="text-gray-900 text-xl p-6"
                  size="txtPoppinsRegular20Gray900"
                >
                  {book.synopsis}
                </Text>
                <Text
                  className="mt-[15px] text-gray-900 text-xl p-6"
                  size="txtPoppinsLight20Gray60001"
                >
                  First published {book.created_at}
                </Text>
              </div>
            </div>

            <div className="bg-deep_purple-A200 flex flex-col gap-[22px] items-center justify-start mt-[107px] p-11 m-6 md:px-10 sm:px-5 rounded-[15px] ">
              <Text
                className="sm:text-[32px] md:text-[38px] text-[42px] text-center text-white-A700 w-[69%] sm:w-full"
                size="txtPoppinsSemiBold42"
              >
                Join our newsletter to get our latest recommendation!
              </Text>
              <div className="flex sm:flex-col flex-row gap-2 items-center justify-center mb-[17px] w-2/5 md:w-full">
                <div
                  className="bg-cover bg-no-repeat flex flex-col h-[56px] items-start justify-end p-2.5 w-[77%] sm:w-full"
                  style={{
                    backgroundImage: "url('/images/img_group39466.svg')",
                  }}
                >
                  <div className="flex flex-row gap-3 items-start justify-start ml-2 md:ml-[0] mt-1 w-[65%] md:w-full">
                    <Img
                      className="h-5"
                      src="/images/img_lock.svg"
                      alt="lock"
                    />
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
                    backgroundImage: "url('/images/img_group39467.svg')",
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
          <Footer className="flex font-dmsans items-center justify-center md:px-5 w-full" />
        </div>
      </div>
    </>
  );
};

export default SingleBookPage;
