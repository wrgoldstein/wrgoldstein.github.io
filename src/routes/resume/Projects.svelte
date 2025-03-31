<script>
  const projects = [
    {
      year: 2013,
      type: "job",
      company: "howaboutwe.com",
      role: "Data Scientist",
      description: "I got my first post-graduate job at howaboutwe.com, a dating site that matched people based on their preferences.",
      work_projects: [
        {
          name: "Churn Forecasting",
          description: "I did a little bit of churn forecasting.",
        }
      ],
    },
    {
      year: 2014,
      type: "job",
      company: "artsy.net",
      role: "Data Analyst / Software Engineer",
      description: "I worked on the analytics and platform teams at artsy.net, a platform for buying and selling art.",
      work_projects: [
        
      ],
      projects: [
        {
          name: "Sonic",
          type: "personal",
          year: 2014,
          description: "My first web app was https://github.com/wrgoldstein/sonic, a little graphical illustration of sonic booms with d3.js.",
        },
        {
          name: "Built data infrastructure for analytics reporting",
          type: "work",
          company: "artsy.net",
          year: 2014,
          description: `At the time we did reporting by running mongodb queries in production consoles. 
          I worked with an engineer to stand up a data warehouse (Redshift) and a reporting tool (Looker).`,
        },
        {
          name: "What Changed When",
          type: "work-ish",
          company: "artsy.net",
          year: 2015,
          description: "I built a tool for visualizing the git history of a repository.",
        },
        {
          name: "Inquiry Map",
          type: "work-ish",
          company: "artsy.net",
          year: 2015,
          description: "I built a geographic visualization of artwork inquiries flying around the world, visualized as lines connecting the geolocatio of buyer and seller.",
        }
      ]
    }
  ]
</script>


## 2013

I got my first post-graduate job at [howaboutwe.com](https://howaboutwe.com), a dating site that matched people based on their preferences.

I worked on analyics reporting using R and ggplot2 and MySQL, and eventually Redshift. We created pdf reports using R and emailed them out on a cron schedule.

I also did a little bit of churn forecasting.

## 2014

({new Date().getFullYear() - 2014} years ago, wow.)

My first web app was https://github.com/wrgoldstein/sonic, a little graphical illustration of sonic booms with d3.js.

It basically just animated a bunch of circles behind a rocket and showed how the circles overlapped to create a sonic boom.

## 2015

In 2015 I built [what-changed-when](https://github.com/wrgoldstein/what-changed-when), a tool for visualizing the git history of a repository.

I was working as a data analyst at the time, and I frequently needed to understand when a feature changed in order to make sense of the associated metrics. This project rendered a bar chart over time of the commits per day and when you hovered over a bar it would show you the commit messages, and link out to the diff.

I also built [inquiry-map](https://github.com/wrgoldstein/inquiry-map), a geographic visualization of artwork inquiries flying around the world, visualized as lines connecting the geolocatio of buyer and seller.


## 2016

