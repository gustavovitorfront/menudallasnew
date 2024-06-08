import { Box, Flex, Text } from "@chakra-ui/react";
import { useKeenSlider } from "keen-slider/react";
import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { connect } from "react-redux";
import { categoriesActions } from "../../store/actions";
import { isEmpty } from "lodash";
import slugify from "slugify";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { filterGpProduct } from "../../utils/filtersPromotion";

function MenuOptionsStore({ data, categories, products, getAll, subdomain }) {
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [active, setActive] = useState(0);
  const options = {
    initial: 0,
    slides: {
      perView: 2,
      spacing: 28,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 2,
        },
      },
      "(min-width: 769px) and (max-width: 1500px)": {
        slides: {
          perView: 5,
          spacing: 28,
        },
      },
      "(min-width: 1501px) and (max-width: 1920px)": {
        slides: {
          perView: 7,
          spacing: 28,
        },
      },
      "(min-width: 1921px) and (max-width: 3000px)": {
        slides: {
          perView: 10,
          spacing: 28,
        },
      },
    },
  };

  const [internalSliderRef, internalSlider] = useKeenSlider(options);

  useEffect(() => {
    setTimeout(() => {
      internalSlider.current?.update(options);
    }, 500);
  }, [internalSlider, options]);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      let header_height = document.getElementById("header")?.clientHeight;
      let header_ref = document.getElementById("ref")?.offsetTop;
      let yOffset = 0;

      yOffset = document.documentElement.scrollTop + 60;
      if (yOffset >= header_height) {
        document.getElementById("header")?.classList.add("minimized");
      } else {
        document.getElementById("header")?.classList.remove("minimized");
      }

      if (yOffset >= header_ref) {
        document.getElementById("ref")?.classList.add("minimized");
      } else {
        document.getElementById("ref")?.classList.remove("minimized");
      }
    });

    if (isEmpty(categories)) {
      setCategoriesData([]);
      setIsLoading(false);
      getAll(data.user_id);
    }
  }, []);

  useEffect(() => {
    if (categories.items) {
      setCategoriesData(categories.items);
      setIsLoading(false);
    } else {
      setCategoriesData([]);
    }

    if (categories.loading) {
      setIsLoading(categories.loading);
    }
  }, [categories]);

  useEffect(() => {
    if (products.items) {
      setProductsData(products.items);
    } else {
      setProductsData([]);
    }
  }, [products]);

  return (
    <Box
      id="ref"
      w="100%"
      bg={data?.primary_color}
      h="75px"
      display="flex"
      padding={["12px 30px", "12px 50px"]}
      alignItems="center"
      justifyContent="center"
      css={`
        &.minimized {
          position: fixed;
          top: 88px;
          z-index: 8;
        }
      `}
    >
      {!isLoading && (
        <Box
          ref={internalSliderRef}
          className="keen-slider"
          alignItems="center"
        >
          {categoriesData.map(
            (item, key) =>
              productsData?.filter((entry) => filterGpProduct(entry, item))
                .length > 0 && (
                <Box className="keen-slider__slide" key={key}>
                  <Box
                    _hover={{
                      opacity: 0.8,
                    }}
                    textAlign="center"
                    cursor="pointer"
                    borderTop={active == item.id_grupo ? "2px solid" : "0px"}
                    pt="8px"
                    pb="8px"
                    borderColor="#fff"
                  >
                    <AnchorLink
                      offset="300"
                      href={"#" + slugify(item.descricao, { lower: true })}
                      onClick={() => setActive(item.id_grupo)}
                    >
                      <Text
                        color="white"
                        fontSize={["12px", "15px"]}
                        lineHeight={["14px", "auto"]}
                        fontWeight={600}
                      >
                        {item.descricao}
                      </Text>
                    </AnchorLink>
                  </Box>
                </Box>
              )
          )}
        </Box>
      )}
    </Box>
  );
}

function mapState(state) {
  const { categories, products } = state;
  return { categories, products };
}

const actionCreators = {
  getAll: categoriesActions.getAll,
};

export default connect(mapState, actionCreators)(MenuOptionsStore);
