import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import paths from '../data/paths'
import { alternateSources } from '../data/resources'
import {
  Layout,
  LayoutHeader,
  LayoutHero,
  LayoutVillain,
  LayoutContainer,
  Typography,
  Box,
  Grid,
} from '../src/theme'
import { IconLink as GithubIconLink } from '../src/github'
import { AlternateSourcesList } from '../src/resources'
import { List as PathsList } from '../src/paths'

export const getStaticProps = async (_: GetStaticPropsContext) => {
  return {
    props: {
      paths,
      alternateSources,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const PageHead = () => (
  <Head>
    <title>Sherpa: Climbing the learning curve</title>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png?v=1"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png?v=1"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png?v=1"
    />
    <link rel="manifest" href="/site.webmanifest?v=1" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#5bbad5" />
    <link rel="shortcut icon" href="/favicon.ico?v=1" />
    <meta name="msapplication-TileColor" content="#ff6bdf" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
)

export default function Home({ paths, alternateSources }: Props) {
  return (
    <>
      <PageHead />
      <Layout>
        <LayoutHeader>
          <GithubIconLink />
        </LayoutHeader>

        <main>
          <LayoutHero>
            <Typography variant="h1" color="primary.contrastText">
              Climbing the learning curve
            </Typography>
          </LayoutHero>

          <LayoutContainer>
            <Box py={2}>
              <Grid container>
                <Grid item sm={9}>
                  <Typography variant="body1" component="p" gutterBottom>
                    Learning new things is amazing.
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    There are many platforms providing paid access to high
                    quality educational material, but did you know there are
                    equally stunning online resources provided for free?
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    Sherpa collects hundreds of those, organizing them into
                    learning paths to help you discover different technologies.
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    All resources are free, hand-picked to create open and
                    comprehensive collections.
                  </Typography>
                  <Typography variant="body1" component="p">
                    Happy learning!
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box py={2}>
              <PathsList paths={paths} />
            </Box>
          </LayoutContainer>

          <Box pt={6}>
            <LayoutVillain>
              <Box py={2}>
                <Typography variant="h2">
                  There are many paths to the top of the mountain
                </Typography>
              </Box>
              <Box py={2}>
                <Typography variant="body1" component="p" gutterBottom>
                  Not happy with what you found here? You can try to have a look
                  at other similar projects.
                </Typography>
              </Box>
              <Box py={2}>
                <AlternateSourcesList resources={alternateSources} />
              </Box>
              <Box py={2}>
                <Typography variant="body1" component="p">
                  And many others! <br /> All it takes is the effort to search
                  online for what sparks one&apos;s interest.
                </Typography>
              </Box>
            </LayoutVillain>
          </Box>
        </main>
      </Layout>
    </>
  )
}
