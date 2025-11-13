import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div>
      <div className='division5'>
        <div className='pricing'>Pricing</div>
        <div className='horizontal-blocks'>
          <div className='hb-1'>
            <h3 className='hb-header'>Starter Templates</h3>
            <ul className='hb-flex1'>
              <li>Access to 10 free templates</li>
              <li>Responsive & modern designs</li>
              <li>HTML, CSS, JS ready</li>
              <li>Download instantly</li>
              <li>No login required</li>
              <li>Great for beginners</li>
              <li>Lifetime access to free updates</li>
              <li>Community support</li>
            </ul>
            <div className='hb-btn'>
              Start For Free
            </div>
          </div>
          <div className='hb-2'>
            <div className='bestValue'>
              BEST VALUE
            </div>
            <h3 className='hb-header-center'>Pro Templates</h3>
            <ul className='hb-flex2'>
              <li>Access to 100+ premium templates</li>
              <li>Dashboard, Portfolio, and E-commerce layouts</li>
              <li>Upload your custom assets (logo, images)</li>
              <li>Save templates to favorites</li>
              <li>API access for developers</li>
              <li>JWT-based secure login</li>
              <li>Fast customer support (24-hour response)</li>
              <li>New templates every month</li>
            </ul>
            <div className='hb-btn-center'>
              Upgrade to Pro
            </div>
          </div>
          <div className='hb-1'>
            <h3 className='hb-header2'>Business Suite</h3>
            <ul className='hb-flex1'>
              <li>Includes everything in Pro</li>
              <li>Custom branding support</li>
              <li>Team access (add multiple users)</li>
              <li>Priority customer assistance</li>
              <li>API rate limits increased</li>
              <li>Advanced analytics dashboard</li>
              <li>Early access to beta templates</li>
              <li>Monthly design review session</li>
            </ul>
            <div className='hb-btn1'>
              Unlock Business Plan
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
