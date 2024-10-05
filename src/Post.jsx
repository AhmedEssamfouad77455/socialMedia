import { Box, Button, Paper } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGetPostByNameQuery } from "./Redux/Posts";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AddCommentIcon from "@mui/icons-material/AddComment";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: ({ expand }) => (expand ? "rotate(180deg)" : "rotate(0deg)"),
}));

export default function Post() {
  const [page, setPage] = React.useState(1);
  const [allPosts, setAllPosts] = React.useState([]); 
  const { data, error, isLoading, isFetching } = useGetPostByNameQuery(
    `posts?limit=5&page=${page}`
  );
  const [expandedPostId, setExpandedPostId] = React.useState(null);
  const [changeColor, setChangeColor] = React.useState({});

  const handleFavoriteClick = (id) => {
    setChangeColor((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  React.useEffect(() => {
    if (data) {
      setAllPosts((prev) => [...prev, ...data.data]); 
    }
  }, [data]);

  if (isLoading)
    return (
      <Stack
        spacing={1}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          direction: "rtl",
        }}
      >
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    );
  if (error) return <Typography>Error fetching posts.</Typography>;

  const hasMore = data && data.data.length > 0;

  const handleExpandClick = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  const fetchMoreData = () => {
    if (hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderPost = (item) => {
    const isExpanded = expandedPostId === item.id;

    return (
      <Card key={item.id} sx={{ width: 350, my: 3, direction: "rtl" }}>
        <CardHeader
          avatar={
            <Avatar
              alt={item.author.username}
              src={item.author.profile_image}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={item.author.username}
          subheader={item.created_at}
        />
        <CardMedia
          component="img"
          height="300"
          image={
            item.image && Object.keys(item.image).length > 0
              ? item.image
              : "https://mui.com/static/images/cards/paella.jpg"
          }
          alt={item.title}
        />
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textWrap: "wrap",
              textOverflow: "ellipsis",
              padding: "20px",
            }}
          >
            {item.body}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          disableSpacing
        >
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleFavoriteClick(item.id)}
          >
            <FavoriteIcon
              style={{ color: changeColor[item.id] ? "red" : "grey" }}
            />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={isExpanded}
            onClick={() => handleExpandClick(item.id)}
            aria-expanded={isExpanded}
            aria-label="show more"
          >
            <AddCommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            {item.tags.map((tag, index) => (
              <Paper
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  my: 4,
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                  direction: "rtl",
                }}
              >
                <Avatar
                  alt={item.author.username}
                  src={item.author.profile_image}
                />

                <Typography>{tag}</Typography>
              </Paper>
            ))}
            <Stack
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap:"10px",
flexDirection:"row",
flexWrap:"nowrap",

                direction: "rtl",
                width: "100%",
               

              }}
            >
            <TextField
            sx={{
             
            ".MuiInputBase-input":{
              height: "0.4375em"
            }

            }}
              
            
         
             
              value={""}
              />
    
              <Button variant="contained" style={{textWrap:"nowrap"}}>اضافه تعليف</Button>
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "wrap",
        overflow: "hidden",
      }}
    >
      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more items to load</p>}
        scrollThreshold={0.9}
      >
        {allPosts.map(renderPost)}
      </InfiniteScroll>
    </Box>
  );
}
