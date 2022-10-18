import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import EdiText from "react-editext";
import "./home.css";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#ffffff",
      contrastText: "#0971f1",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  /* border: "2px solid #000", */
  boxShadow: 24,
  p: 4,
};

function HomePage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = useState(null);
  const imageref = useRef(null);

  const logoutUser = async () => {
    console.log(user);
    await fetch("/logout", {
      method: "POST",
    })
      .then((response) => {
        console.log(user, response);
        if (response.status === 200) {
          return response.json();
        } else alert("Error");
      })
      .then((response) => {
        console.log(response);
        setUser(null);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(user);
    fetch("/@me")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        console.log(response);
        setUser(response);
      })
      .catch((error) => console.log("Not authenticated"));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Movie Review
          </Typography>

          {user == null ? (
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="neutral">
                Login
              </Button>
            </Link>
          ) : (
            <Button variant="contained" color="neutral" onClick={logoutUser}>
              Logout{user.id}
              {user.email}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Movie Review
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              A movie review is an article that is published in a newspaper,
              magazine, or scholarly work that describes and evaluates a movie.
              Reviews are typically written by journalists giving their opinion
              of the movie. Some reviews include score (4 out of 5 stars) or
              recommendations (thumbs up).
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={handleOpen}>
                Add Movies
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Add a new movie
                  </Typography>
                  <br />
                  <input type={"file"} />
                  <br />
                  <br />
                  <TextField
                    fullWidth
                    id="modal-modal-description"
                    label="Title"
                    name="Title"
                    autoComplete="Title"
                    /* value={email}
                  onChange={(e) => setEmail(e.target.value)} */
                  />
                  <br />
                  <br />

                  <Form.Control
                    required
                    placeholder="Description"
                    as="textarea"
                    rows={5}
                  />
                  <br />
                  <Button variant="contained" onClick={handleOpen}>
                    Add
                  </Button>
                </Box>
              </Modal>
              {/*               <Button variant="outlined">Secondary action</Button>
               */}{" "}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random"
                    ref={imageref}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <EdiText
                        type="text"
                        value="Heading"
                        showButtonsOnHover
                        submitOnEnter
                        cancelOnEscape
                      />
                    </Typography>
                    <EdiText
                      type="textarea"
                      inputProps={{
                        className: "textarea",
                        placeholder: "Type your content here",
                        style: {
                          outline: "none",
                          minWidth: "auto",
                        },
                        rows: 5,
                      }}
                      submitOnEnter
                      cancelOnEscape
                      value="This is a media card. You can use this section to describe
                      the content."
                    />
                    <Typography></Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <input
                      type={"file"}
                      onInput={(e) => {
                        imageref.current.src = e.target.value;
                        console.log(e.target.value);
                        console.log(imageref.current);
                      }}
                    />
                    {/* <Button size="small">Upload Image</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Providing the best reviews for movies!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default HomePage;
