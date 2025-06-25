import React from 'react';
import Logo from '../assets/logo t4teq.ico';
import { Link } from 'react-router-dom';
import './T4teq.css';
import './EHome.css';


// Import course logos
import cImg from '../assets/c.png';
import cppImg from '../assets/cpp.png';
import javaImg from '../assets/java.png';
import pythonImg from '../assets/python.png';
import htmlImg from '../assets/html.png';
import cssImg from '../assets/css.png';
import jsImg from '../assets/js.png';
import bootstrapImg from '../assets/bootstrap1.png';
import phpImg from '../assets/php.png';
import djangoImg from '../assets/django.png';
import springbootImg from '../assets/springboot.png';
import aspnetImg from '../assets/aspnet.webp';
import csharpImg from '../assets/csharp.png';
import reactImg from '../assets/react.png';
import nodeImg from '../assets/node.png';
import angularImg from '../assets/angular.png';
import vueImg from '../assets/vue.png';
import nextjsImg from '../assets/nextjs.png';
import tsImg from '../assets/ts.png';
import expressImg from '../assets/express.png';
import mysqlImg from '../assets/mysql.png';
import oracleImg from '../assets/oracle.png';
import mongoImg from '../assets/mongodb.png';
import excelImg from '../assets/excel.png';
import powerbiImg from '../assets/powerbi.png';
import tableauImg from '../assets/tableau.png';
import rImg from '../assets/r.png';
import mlImg from '../assets/ml.png';
import officeImg from '../assets/office.png';
import illustratorImg from '../assets/illustrator.png';
import photoshopImg from '../assets/photoshop.png';
import xdImg from '../assets/xd.png';
import figmaImg from '../assets/figma.webp';
import dmImg from '../assets/dm.png';
import androidImg from '../assets/android.png';
import flutterImg from '../assets/flutter.png';
import rnImg from '../assets/reactnative.png';
import gitImg from '../assets/git.png';
import githubImg from '../assets/github.png';

// Course array with image references
const courses = [
  { name: "C", image: cImg },
  { name: "C++", image: cppImg },
  { name: "Java", image: javaImg },
  { name: "Python", image: pythonImg },
  { name: "HTML5", image: htmlImg },
  { name: "CSS3", image: cssImg },
  { name: "JavaScript", image: jsImg },
  { name: "Bootstrap", image: bootstrapImg },
  { name: "PHP", image: phpImg },
  { name: "Django", image: djangoImg },
  { name: "SpringBoot", image: springbootImg },
  { name: "ASP.Net", image: aspnetImg },
  { name: "C#", image: csharpImg },
  { name: "React", image: reactImg },
  { name: "Node js", image: nodeImg },
  { name: "Angular", image: angularImg },
  { name: "Vue js", image: vueImg },
  { name: "Next.js", image: nextjsImg },
  { name: "TypeScript", image: tsImg },
  { name: "Express", image: expressImg },
  { name: "MySQL", image: mysqlImg },
  { name: "Oracle", image: oracleImg },
  { name: "MongoDB", image: mongoImg },
  { name: "Excel", image: excelImg },
  { name: "PowerBI", image: powerbiImg },
  { name: "Tableau", image: tableauImg },
  { name: "R Programming", image: rImg },
  { name: "Machine Learning", image: mlImg },
  { name: "Office Automation", image: officeImg },
  { name: "Adobe Illustrator", image: illustratorImg },
  { name: "Adobe Photoshop", image: photoshopImg },
  { name: "Adobe XD", image: xdImg },
  { name: "Figma", image: figmaImg },
  { name: "Digital Marketing", image: dmImg },
  { name: "Android studio", image: androidImg },
  { name: "Flutter", image: flutterImg },
  { name: "React Native", image: rnImg },
  { name: "Git", image: gitImg },
  { name: "GitHub", image: githubImg },
];

function DHome() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-section shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <button className="btn btn btn-primary text-start mb-2">
          <i className="bi bi-house-door-fill"></i>
        </button>
          </Link>
          <span className="brand-text h1 text-white mx-auto d-none d-lg-block"> Employee Skill Report</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="btn btn-primary ms-lg-3 mt-2 mt-lg-0" to="/skill">Employee Skill Entry</Link>
                <Link className="btn btn-primary ms-lg-3 mt-2 mt-lg-0" to="/update">Employee Skill Update</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Course Cards */}
      <div className="container py-4">
        <div className="row g-4">
          {courses.map((course, index) => (
            <div className="col-md-3 col-sm-6" key={index}>
              <Link to="/info" state={{ title: course.name }}>
              <div className="course-card p-3 text-center shadow-sm rounded">
                <img
                  src={course.image}
                  alt={`${course.name} logo`}
                  style={{ width: '60px', height: '60px' }}
                  className="mb-2 animate-icon"
                />
                <h5 className="course-title">{course.name}</h5>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DHome;
