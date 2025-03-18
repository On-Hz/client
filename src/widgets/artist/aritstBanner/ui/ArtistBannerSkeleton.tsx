import React from "react";
import { Skeleton, Box, Grid, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

// 스타일링된 컴포넌트
const BannerContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "450px",
});

const GridBackground = styled(Grid)({
  height: "450px",
  position: "absolute",
  width: "100%",
  top: 0,
  left: 0,
});

const ContentContainer = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "0 32px 16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  height: "100%",
});

const RatingContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  gap: "32px",
});

const TabsContainer = styled(Box)({
  display: "flex",
  marginTop: "16px",
  gap: "16px",
  paddingBottom: "8px",
});

export const ArtistBannerSkeleton = () => {
  return (
    <BannerContainer>
      {/* 3열 그리드 배경 스켈레톤 */}
      <GridBackground container>
        <Grid item xs={4} sx={{ bgcolor: "grey.700", opacity: 0.6 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        </Grid>
        <Grid item xs={4} sx={{ bgcolor: "grey.500" }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        </Grid>
        <Grid item xs={4} sx={{ bgcolor: "grey.700", opacity: 0.6 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        </Grid>
      </GridBackground>

      {/* 콘텐츠 스켈레톤 */}
      <ContentContainer>
        {/* 아티스트 이름 스켈레톤 */}
        <Box mb={3}>
          <Skeleton
            variant="text"
            width="60%"
            height={96}
            animation="wave"
            sx={{ bgcolor: "grey.400" }}
          />
        </Box>

        {/* 별점 영역 스켈레톤 */}
        <RatingContainer>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Skeleton
              variant="text"
              width={64}
              height={40}
              animation="wave"
              sx={{ bgcolor: "grey.400" }}
            />
            <Skeleton
              variant="text"
              width={96}
              height={24}
              animation="wave"
              sx={{ bgcolor: "grey.400" }}
            />
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: "grey.400", width: "1px", height: "56px" }}
          />

          {/* 별점 버튼 스켈레톤 */}
          <Skeleton
            variant="rectangular"
            width={192}
            height={64}
            animation="wave"
            sx={{ bgcolor: "grey.400", borderRadius: 2 }}
          />
        </RatingContainer>

        {/* 탭 스켈레톤 */}
        <TabsContainer>
          <Skeleton
            variant="rectangular"
            width={96}
            height={32}
            animation="wave"
            sx={{ bgcolor: "grey.400", borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width={96}
            height={32}
            animation="wave"
            sx={{ bgcolor: "grey.400", borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width={96}
            height={32}
            animation="wave"
            sx={{ bgcolor: "grey.400", borderRadius: 1 }}
          />
        </TabsContainer>
      </ContentContainer>
    </BannerContainer>
  );
};
