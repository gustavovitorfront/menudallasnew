import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { connect } from "react-redux";
import { segmentosActions } from "../../store/actions";

function MainCategories({ segmentos, getAllSegmentos, setSegmentoActive }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [segmentosData, setSegmentosData] = useState([]);

  useEffect(() => {
    getAllSegmentos();
  }, []);

  useEffect(() => {
    if (segmentos.items) {
      setSegmentosData(segmentos.items);
      setIsLoading(false);
    } else {
      setSegmentosData([]);
    }

    if (segmentos.loading) {
      setIsLoading(segmentos.loading);
    }
  }, [segmentos]);

  console.debug("segmentosData", segmentosData);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 5,
      spacing: 5,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 5,
        },
      },
      "(min-width: 769px) and (max-width: 1500px)": {
        slides: {
          perView: 5,
          spacing: 5,
        },
      },
      "(min-width: 1501px) and (max-width: 1920px)": {
        slides: {
          perView: 7,
          spacing: 5,
        },
      },
      "(min-width: 1921px) and (max-width: 3000px)": {
        slides: {
          perView: 10,
          spacing: 5,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <Box
      position="relative"
      pl={["15px", "15px", "65px"]}
      pr={["15px", "15px", "65px"]}
    >
      <Box ref={sliderRef} className="keen-slider">
        {!isLoading &&
          segmentosData.map((item, key) => (
            <Box
              key={key}
              className="keen-slider__slide"
              cursor="pointer"
              borderRadius="13px"
              minW="216px"
              overflow="hidden"
              onClick={() => setSegmentoActive(item.nome)}
            >
              <Image
                src={item.icone}
                width={216}
                height={112}
                style={{
                  borderRadius: "13px",
                  display: "block",
                  margin: "0px auto",
                  maxHeight: 112,
                  objectFit: "cover",
                }}
                objectFit="cover"
                objectPosition="center"
                alt="Menu Dallas Categoria"
                loader={({ src }) => {
                  return src;
                }}
              />

              <Text
                textAlign="center"
                fontSize="16px"
                fontWeight={400}
                mt="14px"
              >
                {item.nome}
              </Text>
            </Box>
          ))}
      </Box>

      {!isLoading && segmentosData.length > 0 && loaded && instanceRef.current && (
        <>
          <Button
            position="absolute"
            top={["15%", "20%", "21%"]}
            left={["1px", "1px", "30px"]}
            borderRadius="100%"
            variant="btnDallas"
            transform="transform: translate(-50%, -50%)"
            w={["30px", "53px"]}
            h={["40px", "56px"]}
            boxShadow="12px 26px 51px 0px rgba(90, 108, 234, 0.07)"
            _disabled={{
              background: "linear-gradient(140deg, #1E90FF 0%, #1577BE 100%)",
              opacity: "1",
            }}
            _hover={{
              background: "linear-gradient(140deg, #1E90FF 0%, #1577BE 100%)",
              opacity: "1",
            }}
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
            isDisabled={currentSlide === 0}
          >
            <Icon as={MdArrowBackIosNew} fill="#fff" />
          </Button>

          <Button
            variant="btnDallas"
            position="absolute"
            top={["15%", "20%", "21%"]}
            right={["1px", "1px", "48px"]}
            borderRadius="100%"
            transform="transform: translate(-50%, -50%)"
            w={["30px", "53px"]}
            h={["40px", "56px"]}
            boxShadow="12px 26px 51px 0px rgba(90, 108, 234, 0.07)"
            _disabled={{
              background: "linear-gradient(140deg, #1E90FF 0%, #1577BE 100%)",
              opacity: "1",
            }}
            _hover={{
              background: "linear-gradient(140deg, #1E90FF 0%, #1577BE 100%)",
              opacity: "1",
            }}
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
            isDisabled={
              currentSlide ===
              instanceRef?.current?.track?.details?.slides.length - 1
            }
          >
            <Icon as={MdArrowForwardIos} fill="white" />
          </Button>
        </>
      )}
    </Box>
  );
}

function mapState(state) {
  const { segmentos } = state;
  return { segmentos };
}

const actionCreators = {
  getAllSegmentos: segmentosActions.getAll,
};

export default connect(mapState, actionCreators)(MainCategories);
