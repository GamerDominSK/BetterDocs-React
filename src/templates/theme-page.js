import React from 'react'
import Layout from '../components/layout-mobile-footer'
//import style from '../styles/theme-page.module.scss'
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import kebabCase from "lodash/kebabCase"
import Helmet from 'react-helmet'
import AdSense from 'react-adsense';
//import alert from '../styles/alerts.module.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Hero from '../components/themes/hero'
import "../styles/tooltips.css"
import styled from 'styled-components';
import * as variable from '../styles/variables'
import { darken } from "polished"
import Alerts from '../components/themes/page-alert'
import { createGlobalStyle } from 'styled-components'
import ContributionArea from '../components/themes/page-contributors-area'
import InformationArea from '../components/themes/page-info-area'
import TagsArea from '../components/themes/page-tags-area'

/*
{node.frontmatter.profile_picture ?
  <div data-balloon={node.frontmatter.author + "'s Avatar"} data-balloon-pos="right" className={hero.profileWrapper}>
    <img src={node.frontmatter.profile_picture} alt={node.frontmatter.author + "'s Profile Picture"} />
  </div>
:
  <div data-balloon="Missing Avatar" data-balloon-pos="right" className={hero.profileWrapper} alt="missing">
    <img src={Missing} alt="Missing Profile Avatar"/>
  </div>
}
*/

const Themes = (props) => {
  const themeList = props.data.listThemes;
  const previewList = props.data.previewsList;

  return (
  <Layout>
    <GlobalStyle />
    {themeList.edges.map(({ node }, i) => (
    <Helmet
      key={node.id}
      title={ node.frontmatter.title + ' by ' + node.frontmatter.author + ' | BetterDocs '}
      meta={[
        { name: 'description', content: node.frontmatter.description },
        { name: 'keywords', content: 'Discord, BetterDiscord, EnhancedDiscord, TwitchCord, Discord Hacks, Hacks, Mods, Discord Themes, Themes, Discord Plugins, Plugins, Discord Bots, Bots, Discord Servers, Discord Style, Styles' },
      ]}>
      <meta property="og:site_name" content="BetterDocs"/>
      {node.frontmatter.author ?
      <meta property="og:title" content={node.frontmatter.title + ' by ' + node.frontmatter.author}/>
      :
      <meta property="og:title" content={node.frontmatter.title}/>
      }
      <meta property="og:description" content={node.frontmatter.description}/>
      {node.frontmatter.thumbnail ?
      <meta property="og:image" content={node.frontmatter.thumbnail}/>
      :
      null
      }
      <meta property="og:url" content={"https://betterdocs.us/themes" + node.fields.slug} />
      <html lang="en" />
    </Helmet>
    ))}
    <Container>
    {themeList.edges.map(({ node }) => (
      <Wrapper key={node.id}>
        <Hero
        title={node.frontmatter.title}
        author={node.frontmatter.author}
        status={node.frontmatter.status}
        download={node.frontmatter.download}
        thumbnail={node.frontmatter.thumbnail}
        sub={node.frontmatter.sub}
        date={node.frontmatter.date}
        github_source_url={node.frontmatter.github_source_url}
        gitlab_source_url={node.frontmatter.gitlab_source_url}
        discord_server={node.frontmatter.discord_server}
        tags={themeList.group}
        auto={node.frontmatter.auto}
        demo={node.frontmatter.demo}
        support={node.frontmatter.support}
        style={node.frontmatter.style}
        />
        {previewList.edges.map(({ node }) => (
        <Tabbs style={{order: "3"}} key={node.id}>
          <TabListt>
            {node.frontmatter.previews ?
            <Tabb>Overview</Tabb>
            :
            <Tabb>Overview</Tabb>
            }
            {node.frontmatter.previews &&
              <Tabb>Screenshots</Tabb>
            }
            </TabListt>

          <TabPanell>
            <ContentContainer>
            <Alerts
            status={node.frontmatter.status}
            title={node.frontmatter.title}
            issue={node.frontmatter.support}
            />
              <Area>
                <CardHeader>Description</CardHeader>
                <AreaDescriptionCard
                dangerouslySetInnerHTML={{ __html: node.html }}>
                </AreaDescriptionCard>
              </Area>
              <AreaFlex>
                <ContributionArea
                author={node.frontmatter.author}
                maintainer={node.frontmatter.current_maintainer}
                title={node.frontmatter.title}
                areaHeader="Contributors"
                slug={node.fields.slug}
                />
                <InformationArea
                status={node.frontmatter.status}
                date={node.frontmatter.date}
                github={node.frontmatter.github_source_url}
                gitlab={node.frontmatter.gitlab_source_url}
                npm={node.frontmatter.npm_source_url}
                areaHeader="Information"
                />
              </AreaFlex>
              {node.frontmatter.tags &&
                <TagsArea
                tagsGrouped={themeList.group}
                areaHeader="Tags"
                />
              }
              <Ad>
                <AdSense.Google
                    client='ca-pub-1998206533560539'
                    slot='6545618600'
                    style={{ display: 'block' }}
                    format='auto'
                    responsive='true'
                  />
              </Ad>
              <Options>
                {node.frontmatter.download &&
                  <>
                    {node.frontmatter.auto ?
                    <Download href={'https://minhaskamal.github.io/DownGit/#/home?url=' + node.frontmatter.download} target="blank">
                      Download
                    </Download>
                    :
                    <Download href={node.frontmatter.download} target="blank">
                      Download
                    </Download>
                    }
                  </>
                }
                {node.frontmatter.demo && 
                  <DemoBtn href={'https://betterdocs.us/preview/' + node.frontmatter.style + '.html?theme=' + node.frontmatter.demo + "?no-cache=1"} target="blank" title={"Quick Preview of " + node.frontmatter.title }>Demo</DemoBtn>
                }
                {node.frontmatter.support &&
                <Report href={node.frontmatter.support} target="blank">
                  Doesn't Work?
                </Report>
                }
              </Options>
            </ContentContainer>
          </TabPanell>
          {node.frontmatter.previews &&
          <TabPanell style={{margin: "0 auto"}}>
          <ContentContainer>
            <CardHeader>Screenshots</CardHeader>
            <ScreenshotContainer>
              {previewList.group.map(image => (
                <ScreenshotWrapper key={image.fieldValue}>
                  <ImageContainer>
                    <img src={image.fieldValue} alt={node.frontmatter.title + " made by " + node.frontmatter.author}/>
                    <ImageOptions>
                      <OptionsWrapper>
                        <a 
                        href={image.fieldValue}
                        target="blank"
                        >Full Image</a>
                      </OptionsWrapper>
                    </ImageOptions>
                  </ImageContainer>
                </ScreenshotWrapper>
              ))}
            </ScreenshotContainer>
            </ContentContainer>
          </TabPanell>
          }
        </Tabbs>
        ))}
      </Wrapper>
      ))}

    </Container>
    <MobileBackBtn
    to="/themes/"
    cover
    bg="#0a0a0a">
      <svg xmlns='http://www.w3.org/2000/svg' id='Capa_1' viewBox='0 0 240.823 240.823' width='512' height='512'>
        <path id='Chevron_Right' d='M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179 l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816 C52.942,116.507,52.942,124.327,57.633,129.007z' fill='#FFF' />
      </svg>
    </MobileBackBtn>
    {themeList.edges.map(({ node }, i) => (
    <EditBtn key={node.id}>
        <a data-balloon="Edit this page" data-balloon-pos="left" href={`https://github.com/MrRobotjs/BetterDocs-React/edit/master/src/themes/${kebabCase(node.fields.slug)}.md`} target="blank">
          <svg id='Capa_1' xmlns='http://www.w3.org/2000/svg' width='459' height='459' viewBox='0 0 459 459'>
              <path d='M0,362.1V459h96.9l280.5-283.05l-96.9-96.9L0,362.1z M451.35,102c10.2-10.2,10.2-25.5,0-35.7L392.7,7.649 c-10.2-10.2-25.5-10.2-35.7,0l-45.9,45.9l96.9,96.9L451.35,102z' id='create' />
          </svg>
        </a>
    </EditBtn>
    ))}
    {themeList.edges.map(({ node }, i) => (
    <MobileHeader key={node.id}>
      <Text>{node.frontmatter.title}</Text>
    </MobileHeader>
    ))}
  </Layout>
)
}
//<Sidebar />

export default Themes;

export const themesQuery = graphql`
  query themesQuery($slug: String!) {
    listThemes:allMarkdownRemark(
      filter: { 
        collection: { 
          eq: "themes" 
        } 
        fields: {
          slug: {
            eq: $slug
          }
        }
      }
      ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      ...themeDateFormatFragment
    },
    previewsList:allMarkdownRemark(
      filter: { 
        collection: { 
          eq: "themes" 
        } 
        fields: {
          slug: {
            eq: $slug
          }
        }
      }
      ) {
      group(field: frontmatter___previews) {
        fieldValue
        totalCount
      }
      ...themeFragment
    },
    currentThemes:markdownRemark(collection: { eq: "themes" }) {
    ...themeDateSingleFragment
  }
}
`
const Wrapper = styled.section`
`
const Tabbs = styled(Tabs)`
`
const TabListt = styled(TabList)`
`
const Tabb = styled(Tab)`
`
const TabPanell = styled(TabPanel)`
`
const ContentContainer = styled.div`
`
const Options = styled.div`
`
const Download = styled.a`
`
const Report = styled.a`
`
const DemoBtn = styled.a`
`
const ScreenshotContainer = styled.div`
`
const ScreenshotWrapper = styled.div`
`
const ImageContainer = styled.div`
`
const OptionsWrapper = styled.div`
`
const ImageOptions = styled.div`
`
const Text = styled.div`
`
const Ad = styled.div`
`
const AreaDescriptionCard = styled.div`
`
const CardHeader = styled.h1`
`
const Area = styled.div`
`
const AreaFlex = styled.div`
`
const MobileBackBtn= styled(AniLink)`
  position: fixed;
  top: 22px;
  left: 17px;
  z-index: 101;
  display: block;
  @media (min-width: 850px) {
      display: none;
  }
  svg {
      height: 20px;
      width: 20px;
  }
`
const EditBtn = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 2.5rem;
  z-index: 100;
  @media (min-width: 850px) {
      right: 1.5rem;
      bottom: 1rem;
  }
  a {
      display: block;
      width: 2.5rem;
      height: 2.5rem;
      background-color: ${variable.SiteColor};
      color: #fff;
      text-align: center;
      line-height: 2.5rem;
      border-radius: 50%;
      transition: all linear 250ms;
      box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.5), inset 0px 2px 3px -2px #ffffff;
      font-size: 1.3rem;
      &:hover {
          box-shadow: 0px 5px 9px 1px rgba(0, 0, 0, 0.4), inset 0px 2px 3px -2px #ffffff;
          background-color: ${darken(0.1,variable.SiteColor)};
      }
      svg {
          height: 17px;
          width: 17px;
          fill: #fff;
          margin: 0 auto;
          top: -3px;
          position: relative;
      }
  }
`
const MobileHeader = styled.div`
  position: fixed;
  top: 0px;
  z-index: 100;
  display: block;
  color: #fff;
  background-color: #0a0a0a;
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  box-shadow: -4px 0px 8px 0px black;
  div {
      width: calc(100% - 4rem);
      display: block;
      margin: 0 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.7rem;
  }
  @media (min-width: 850px) {
      display: none;
  }
`

const Container = styled.div`
  display: block;
  flex-direction: column;
  background-color: #f1f1f1;
  @media (min-width: 850px) {
      display: flex;
      flex-direction: row;
  }
  ${Wrapper} {
    order: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-left: unset;
    @media (min-width: 850px) {
        flex: 4;
        padding-left: 14.8rem;
        padding-left: unset;

    }
    ${Tabbs} {
      order: 3;
      ${TabListt} {
        display: flex;
        justify-content: center;
        border-bottom: unset;
        margin-bottom: unset;
        margin-left: unset;
        ${Tabb} {
          transform: all 250ms linear;
          margin: calc(1.45rem / 2) 0;
          padding: .35rem .75rem;
          text-shadow: 0 1px rgba(255,255,255,0.5);
          border-radius: 100px;
          border: 1px solid transparent;
          font-size: .575rem;
          font-weight: bold;
          color: #5f6368;
          list-style: none;
          cursor: pointer;
          text-shadow: unset;
          &:nth-child(2) {
            margin-left: 10px;
          }
          &:only-child {
            display: none;
          }
          &:hover {
              color: ${variable.SiteColor};
          }
          &:focus {
              outline: unset;
              border: 1px solid ${darken(0.1,variable.SiteColor)};
              box-shadow: unset;
          }
          &:focus::after {
              display: none;
          }
          &[class*="selected"] {
            color: ${variable.SiteColor};
            box-shadow: unset;
            text-shadow: unset;
            background-color: #fff;
            box-shadow: 0 1px 3px 1px rgba(60,64,67,0.15), 0 1px 2px 0 rgba(60,64,67,0.3);
          }
        }
      }
      ${TabPanell} {
        /*width: calc(100% - 75px);*/
        margin: 0 auto;
        @media (min-width: 850px) {
          /*width: calc(100% - 300px);*/
        }
        ${ContentContainer} {
          display: flex;
          order: 4;
          flex-direction: column;
          max-height: 100%;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 3.1rem;
          margin: 0 auto;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 1rem;
          word-break: break-all;
          font-size: 0.6rem;
          @media (min-width: 850px) {
            padding-bottom: unset;
          }
          a:not([class*="anchor"]) {
            display: inline-block;
            transition: color 250ms, text-shadow 250ms;
            color: #000;
            text-decoration: none;
            cursor: pointer;
            position: relative;
            z-index: 0;
            line-height: 1rem;
            &:after {
              position: absolute;
              z-index: -1;
              bottom: -1px;
              left: 50%;
              transform: translateX(-50%);
              content: '';
              width: 100%;
              height: 3px;
              background-color: ${variable.SiteColor};
              transition: all 250ms;
            }
            &:hover {
              color: #fff;
              opacity: 1;
              background-color: transparent;
            &::after {
                height: 110%;
                width: 110%;
              }
            }
          }
          ${AreaFlex} {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
          ${Area} {
            margin-bottom: 1.25rem;
            ${AreaDescriptionCard} {
              display: block;
              word-break: break-word;
              background-color: #fff;
              border-radius: 20px;
              box-shadow: 2px 2px 40px -12px #999;
              padding: 0.8rem 1.1rem;
              border: 1px solid #ececec;
              code {
                font-size: 0.67rem;
                /*line-height: unset;*/
                &~ code {
                  margin-left: 0.18rem;
                }
              }
              pre {
                line-height: unset;
                padding: 0.95rem;
                padding-top: 0.6rem;
                code {
                  font-size: 0.67rem;
                  padding: unset;
                  line-height: unset;
                }
              }
              p {
                color: #666;
              }
              p:only-child, ul:last-child {
                margin-bottom: unset;
              }
              h1 {
                font-size: 1.75rem; /*2.25rem*/
                margin-bottom: 0.7rem; /*1.45*/
                color: #000;
              }
              h2 {
                font-size: 1.22rem; /*1.62671rem*/
                margin-bottom: 0.7rem;
                color: #000;
              }
              table {
                font-size: 0.8rem;
              }
            }
            ${CardHeader} {
              font-size: 1.55rem;
              word-break: keep-all;
              margin-bottom: 0.8rem;
            }
          }
          ${Options} {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            margin-bottom: 0.8rem;
            @media ${variable.MidPoint} {
              flex-direction: row;
              justify-content: flex-start;
              ${Download}, ${DemoBtn} {
                margin-top: 0.5rem;
                margin-right: 0.4rem;
              }
            }
            ${DemoBtn} {
              background-color: ${variable.SiteColor};
              border-radius: 25px;
              padding: 0.5rem 1rem;
              font-size: 0.8rem;
              color: #fff;
              margin-top: 0.5rem;
              box-shadow: 2px 2px 40px -12px #000;
              transition: 300ms ease-in-out all;
              /*background: linear-gradient(90deg,${variable.SiteColor},${darken(0.3, variable.SiteColor)});*/
              &::after {
                height: 0;
              }
              &:hover {
                box-shadow: 2px 10px 40px -12px ${darken(0.3, variable.SiteColor)};
                background-color: ${darken(0.3, variable.SiteColor)};
                &::after {
                  height: 0;
                }
              }
            }
            ${Download} {
              background-color: ${variable.SiteColor};
              border-radius: 25px;
              padding: 0.5rem 1rem;
              font-size: 0.8rem;
              color: #fff;
              box-shadow: 2px 2px 40px -12px #000;
              transition: 300ms ease-in-out all;
              background: linear-gradient(90deg,${variable.SiteColor},${darken(0.3, variable.SiteColor)});
              &::after {
                height: 0;
              }
              &:hover {
                box-shadow: 2px 10px 40px -12px ${darken(0.3, variable.SiteColor)};
                &::after {
                  height: 0;
                }
              }
            }
            ${Report} {
              background-color: #da002f;
              border-radius: 25px;
              padding: 0.5rem 1rem;
              font-size: 0.8rem;
              margin-top: 0.5rem;
              color: #fff;
              box-shadow: 2px 2px 40px -12px #000;
              transition: 300ms ease-in-out all;
              background: linear-gradient(90deg,#da002f, #9e0022);
              position: relative;
              &:after {
                height: 0;
              }
              &:hover {
                box-shadow: 2px 10px 40px -12px #da002f;
                &::after {
                  height: 0;
                }
              }
            }
          }
        }
        ${ScreenshotContainer} {
          background-color: #fff;
          border-radius: 20px;
          box-shadow: 2px 2px 40px -12px #999;
          padding: 0.8rem 1.1rem;
          border: 1px solid #ececec;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-content: center;
          margin-bottom: 1rem;
          @media (min-width: 850px) {
              justify-content: space-between;
          }
          ${ScreenshotWrapper} {
            display: block;
            width: 16.7rem;
            box-shadow: rgba(102, 51, 153, 0.1) 0px 4px 10px;
            border-radius: 2px;
            transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
            position: relative;
            height: 100%;
            flex-basis: 11rem;
            margin-bottom: 1rem;
            &:hover {
              ${ImageContainer} {
                &::before {
                  opacity: 1;
                  pointer-events: all;
                }
                ${ImageOptions} {
                  opacity: 1;
                  ${OptionsWrapper} {
                    pointer-events: all;
                  }
                }
              }
            }
            ${ImageContainer} {
              display: flex;
              &::before {
                content: "";
                display: block;
                background: rgba(0, 0, 0, 0.6);
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                pointer-events: none;
                transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
                z-index: 1;
              }
              img {
                height: 100%;
                width: 100%;
                border-radius: 2px;
                margin: unset;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
              }
            }
            ${ImageOptions} {
              position: absolute;
              top: 0px;
              width: 100%;
              height: 100%;
              z-index: 1;
              flex-direction: column;
              justify-content: center;
              transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
              display: flex;
              opacity: 0;
              pointer-events: none;
              ${OptionsWrapper} {
                  display: flex;
                  flex-direction: column;
                  a {
                      margin: 0 auto;
                      text-align: center;
                      display: -webkit-inline-box;
                      flex: 1 1;
                      background-color: ${variable.SiteColor};
                      border-radius: 25px;
                      padding: .3rem .6rem;
                      font-weight: 400;
                      color: #fff;
                      font-size: .7rem;
                      transition: 250ms linear background-color;
                      &:hover {
                          background-color: ${darken(0.1,variable.SiteColor)};
                      }
                      &:first-child {
                          margin-bottom: 15px;
                      }
                      &:nth-child(2) {
                          background-color: grey;
                          cursor: not-allowed;
                      }
                  }
              }
          }
          }
        }
      }
    }
  }
  ${Ad} {
    order: 3;
    display: block;
  }
`

const GlobalStyle = createGlobalStyle`
[mode="dark"] {
  ${Container} {
    background-color: #36393f;
    ${Wrapper} {
      ${Tabbs} {
        ${TabListt} {
          ${Tabb} {
            color: #5f6368;
            &:hover {
                  color: ${variable.SiteColor};
            }
            &:focus {
                outline: unset;
                border: 1px solid ${darken(0.1,variable.SiteColor)};
                box-shadow: unset;
            }
            &[class*="selected"] {
              background-color: rgba(0,0,0,0.2);
              color: ${variable.SiteColor};
            }
          }
        }
        ${TabPanell} {
          ${ContentContainer} {
            ${CardHeader} {
              color: #fff;
            }
            ${ScreenshotContainer} {
              background-color: rgba(0,0,0,0.2);
              box-shadow: 2px 2px 40px -12px #000;
              border-color: rgba(0,0,0,0.25);
            }
            ${AreaDescriptionCard} {
              background-color: rgba(0,0,0,0.2);
              border-color: rgba(0,0,0,0.25);
              box-shadow: 2px 2px 40px -12px #000;
              p {
                color: #cecece;
              }
              h1, h2, h3, h4, h5, h6, table, ol {
                color: #fff;
              }
              strong {
                color: #ececec;
              }
              ul {
                color: #cecece;
              }
              a {
                color: #fff;
              }
              code {
                background-color: rgba(0,0,0,0.2);
                color: #fff;
              }
              pre {
                background-color: rgba(0,0,0,0.2);
                code {
                  background-color: transparent;
                }
              }
            }
          }
        }
      }
    }
  }
}
`