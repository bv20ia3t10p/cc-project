import { Col, Row } from "antd";
import React from "react";

export const StoreFront: React.FC = () => {
  return (
    <>
      <div
        className="h-[30vh] w-screen"
        style={{
          backgroundImage:
            'url("https://media.crystallize.com/frntr/22/6/8/1/big-sale-banner.jpg")',
          backgroundPosition: "center",
          filter: "blur(20px)",
          height: "500px", // Adjust the height as needed
        }}
      >
        <Row>
          <Col span={12}></Col>
          <Col span={12}>
            <div className="z-10 self-end w-full pt-10 md:w-8/12 img-container img-contain md:py-0">
              <figure className="w-full max-w-none">
                <picture>
                  <source
                    srcSet="https://media.crystallize.com/frntr/22/6/8/1/@100/big-sale-banner.avif 100w, 
                    https://media.crystallize.com/frntr/22/6/8/1/@200/big-sale-banner.avif 200w, 
                    https://media.crystallize.com/frntr/22/6/8/1/@500/big-sale-banner.avif 500w, 
                    https://media.crystallize.com/frntr/22/6/8/1/@768/big-sale-banner.avif 768w"
                    type="image/avif"
                    sizes="(max-width: 500px) 300px, 700px"
                  />
                  <source
                    srcSet="https://media.crystallize.com/frntr/22/6/8/1/@100/big-sale-banner.webp 100w, 
                    https://media.crystallize.com/frntr/22/6/8/1/@200/big-sale-banner.webp 200w, 
                    https://media.crystallize.com/frntr/22/6/8/1/@500/big-sale-banner.webp 500w, 
                    https://media.crystallize.com/frntr/22/6/8/1/@768/big-sale-banner.webp 768w"
                    type="image/webp"
                    sizes="(max-width: 500px) 300px, 700px"
                  />
                  <source
                    srcSet="https://media.crystallize.com/frntr/22/6/8/1/@100/big-sale-banner.jpeg 100w, 
                    https://media.crystallize.com/frntr/22/6/8/1/@200/big-sale-banner.jpeg 200w, 
                    https://media.crystallize.com/frntr/22/6/8/1/@500/big-sale-banner.jpeg 500w, 
                    https://media.crystallize.com/frntr/22/6/8/1/@768/big-sale-banner.jpeg 768w"
                    type="image/jpeg"
                    sizes="(max-width: 500px) 300px, 700px"
                  />
                  <img
                    src="https://media.crystallize.com/frntr/22/6/8/1/big-sale-banner.jpg"
                    alt="Big sale banner"
                    width="768"
                    height="639"
                    loading="lazy"
                  />
                </picture>
                <figcaption></figcaption>
              </figure>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
