import React from "react";
import Sidebar from "./Sidebar";
import { Flex, Grid, Box, Text, Button, Icon, Image } from "@chakra-ui/react";
import axios from "axios";



import { AiFillStar } from 'react-icons/ai'


import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { setItem } from "../utility/localStorage";

import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { Get_cloth_item, sortCLOTHES } from "../store/Cloth/Cloth.action";
import Loading from "./Loading";

const Clothes = () => {
  const [filter, setFilter] = useState("Mens");
  const [reset,setReset ]=useState(false)

  const navigate = useNavigate();
  


  const handleClick = (item) => {
    setItem("singleproduct", item);
    navigate("/clothes/singleproduct");
  };
  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value)
    if(value=="reset"){

      setReset((previous)=>!previous)
      return 
    }
    dispatch(sortCLOTHES(value))

  }
  

  const { cloth } = useSelector((store) => store.ClothManger);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Get_cloth_item());
  }, [reset]);
let data;
   data = cloth.filter((item) => item.category === filter);
   





  {
    if (data.length==0) {
      return <Loading/>;
    } else {
      return (
        <div style={{ marginTop: "120px" }}>
          <Flex>
            {/* <Sidebar setFilter={setFilter}/> */}
            <Box id="maindiv" border={"1px solid"} width={"20%"}>
              <Text
                marginTop={2}
                color={"teal"}
                id="clothe"
                fontSize={35}
                fontWeight={"bold"}
              >
                CLOTHES
              </Text>
              <Box marginLeft={"40px"} textAlign={"left"} marginTop={"15px"}>
                <Flex alignItems={"center"} gap={"15px"}>
                  <Image
                    marginTop={"8px"}
                    borderRadius={"50%"}
                    height={"25px"}
                    width={"25px"}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaXelByMSTcBlhsGChcrAWlXVXNXxI53LxzirHbHwGJQ&s"
                  ></Image>
                  <Text
                    className="menu"
                    onClick={() => setFilter("Mens")}
                    fontWeight={"bold"}
                  >
                    Mens
                  </Text>
                </Flex>

                <Flex alignItems={"center"} gap={"15px"}>
                  <Image
                    marginTop={"8px"}
                    borderRadius={"50%"}
                    height={"25px"}
                    width={"25px"}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZH_L731sgBrBunH8f5lp6pLAhvehf2DuZJGjFeI&s"
                  ></Image>
                  <Text
                    className="menu"
                    onClick={() => setFilter("Womens")}
                    fontWeight={"bold"}
                  >
                    Womens
                  </Text>
                </Flex>

                <Flex alignItems={"center"} gap={"15px"}>
                  <Image
                    marginTop={"8px"}
                    borderRadius={"50%"}
                    height={"25px"}
                    width={"25px"}
                    src="https://img.icons8.com/color/2x/children.png"
                  ></Image>
                  <Text
                    className="menu"
                    onClick={() => setFilter("KIDS")}
                    fontWeight={"bold"}
                  >
                    Kids
                  </Text>
                </Flex>
              </Box>

              <Box id="filter">
            <select  name="" id="" onChange={(e) => handleChange(e)}>
             <option value="reset" >sort-by-price</option>
              <option value="high">Low to high </option>
              <option value="low">High to low</option>
            </select>
          </Box>

              <Box
                id="add"
                marginLeft={"0px"}
                textAlign={"left"}
                marginTop={"50px"}
              >
                <img
                  src="https://img.shop.com/Image/topbrands/nmlogos_76181.gif"
                  alt=""
                />
                <Text>
               
                  Up to 6.00% Cashback <br />
                  Store conditions
                </Text>
                <Button>partner Site 🤝</Button>
              </Box>

              <Box
                id="add"
                marginLeft={"0px"}
                textAlign={"left"}
                marginTop={"20px"}
              >
                <img
                  src="https://img.shop.com/Image/topbrands/nmlogos_98199.gif"
                  alt=""
                />
                <Text>
                  
                  Up to 6.00% Cashback <br />
                  Store conditions
                </Text>
                <Button>partner Site 🤝</Button>
              </Box>
            </Box>

            <Grid
              mt={"30px"}
              marginLeft={"240px"}
              paddingLeft={"15px"}
              width={"80%"}
              templateColumns="repeat(3, 1fr)"
              gap={6}
            >
              {data.map((el) => {
                return (
                  <Box id="probox" key={Math.random()}>
                    <Box textAlign={"left"}>
                      <img id="hov" src={el.image1} alt="" />
                      <Text noOfLines={[1]} fontSize={17}>{el.title}</Text>
                      <Flex gap={2}>
                        <img
                          width={17}
                          src="https://img.shop.com/Image/resources/images/onecart-icon.svg"
                          alt=""
                        />
                        <Text fontSize={13}>Sold by {el.soldby}</Text>
                      </Flex>
                      <p>{el.category}</p>
                      <Text fontWeight={"bold"}>$ {el.price}</Text>
                      <Box mb="15px">
                  {Array(5)
                    .fill("")
                    .map((_, i) => {
                      let rating = Math.ceil(Math.random() * 3);

                      return <Icon
                        as={AiFillStar}
                        key={i}
                        color={i <= rating ? "gold" : "gray.300"}
                      />
                    })}
                </Box>
                      <Text color={"teal"} fontSize={14}>
                        Free shipping with $50.00 orders
                      </Text>

                      <Button
                        backgroundColor={"blue.300"}
                        onClick={() => handleClick(el)}
                        marginTop={"-65px"}
                        borderRadius={25}
                        width={85}
                        marginLeft={"70%"}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          </Flex>
        </div>
      );
    }
  }
};

export default Clothes;
