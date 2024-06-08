import { Box, Flex, Link } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bannersActions } from "../../store/actions";

function MainBanners({ banners, getAllBanners }) {
  const [isLoading, setIsLoading] = useState(false);
  const [bannersData, setBannersData] = useState([]);

  useEffect(() => {
    getAllBanners();
  }, []);

  useEffect(() => {
    if (banners.items) {
      setBannersData(banners.items);
      setIsLoading(false);
    } else {
      setBannersData([]);
    }

    if (banners.loading) {
      setIsLoading(banners.loading);
    }
  }, [banners]);

  return (
    <Flex
      flexWrap="wrap"
      w="100%"
      justifyContent="center"
      alignItems="center"
      mb={["30px", "60px"]}
    >
      {!isLoading && bannersData.map((item, key) => (
        <Box
          key={key}
          borderRadius="8px"
          mb={["20px", ""]}
          overflow="hidden"
          maxW={["100%", "30%"]}
          h={["140px", "182px"]}
          mr={["", "5%"]}
        >
          <Link target="_blank" href={item.link}>
            <Image
              src={item.arte}
              width={366}
              height={182}
              style={{
                height: "100%",
                objectFit: "cover",
              }}
              objectFit="cover"
              objectPosition="center"
              alt="Menu Dallas Vetor"
              loader={({ src }) => {
                return src;
              }}
            />
          </Link>
        </Box>
      ))}
    </Flex>
  );
}

function mapState(state) {
  const { banners } = state;
  return { banners };
}

const actionCreators = {
  getAllBanners: bannersActions.getAll,
};

export default connect(mapState, actionCreators)(MainBanners);
