import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-tech-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tech-template">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="btn red"></span>
          <span class="btn yellow"></span>
          <span class="btn green"></span>
        </div>
        <span class="terminal-title">{{ cvData.personalInfo.name }}.cv</span>
      </div>

      <div class="terminal-content">
        <div class="command-line">
          <span class="prompt">$</span>
          <span class="command">cat personal_info.json</span>
        </div>
        
        <div class="json-block">
          <div class="json-line">&#123;</div>
          <div class="json-line indent">"name": "{{ cvData.personalInfo.name }}",</div>
          <div class="json-line indent">"title": "{{ cvData.personalInfo.title }}",</div>
          <div class="json-line indent">"email": "{{ cvData.personalInfo.email }}",</div>
          <div class="json-line indent">"phone": "{{ cvData.personalInfo.phone }}",</div>
          <div class="json-line indent">"location": "{{ cvData.personalInfo.city }}"</div>
          <div class="json-line">&#125;</div>
        </div>

        <div class="command-line">
          <span class="prompt">$</span>
          <span class="command">cat summary.txt</span>
        </div>
        <div class="output">{{ cvData.personalInfo.summary }}</div>

        <div class="command-line">
          <span class="prompt">$</span>
          <span class="command">ls -la experience/</span>
        </div>
        <div class="file-list">
          <div class="file-item" *ngFor="let exp of cvData.experience">
            <span class="file-permissions">-rw-r--r--</span>
            <span class="file-date">{{ exp.startDate }}</span>
            <span class="file-name">{{ exp.company }}_{{ exp.position }}.md</span>
          </div>
        </div>

        <div class="command-line">
          <span class="prompt">$</span>
          <span class="command">cat skills.array</span>
        </div>
        <div class="skills-array">
          [<span class="skill" *ngFor="let skill of cvData.skills; let last = last">"{{ skill }}"<span *ngIf="!last">, </span></span>]
        </div>

        <div class="command-line">
          <span class="prompt">$</span>
          <span class="command">git log --oneline education</span>
        </div>
        <div class="git-log">
          <div class="commit" *ngFor="let edu of cvData.education">
            <span class="hash">{{ generateHash() }}</span>
            <span class="message">{{ edu.degree }} &#64; {{ edu.institution }}</span>
          </div>
        </div>

        <div class="command-line">
          <span class="prompt">$</span>
          <span class="command">echo "Ready for new challenges!"</span>
        </div>
        <div class="output success">Ready for new challenges!</div>
      </div>
    </div>
  `,
  styles: [`
    .tech-template {
      width: 210mm;
      min-height: 297mm;
      background: #1e1e1e;
      color: #00ff00;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      padding: 0;
      box-sizing: border-box;
    }

    .terminal-header {
      background: #333;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #555;
    }

    .terminal-buttons {
      display: flex;
      gap: 8px;
      margin-right: 15px;
    }

    .btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .btn.red { background: #ff5f56; }
    .btn.yellow { background: #ffbd2e; }
    .btn.green { background: #27ca3f; }

    .terminal-title {
      color: #ccc;
      font-size: 14px;
    }

    .terminal-content {
      padding: 20px;
      line-height: 1.6;
    }

    .command-line {
      margin: 15px 0 5px 0;
    }

    .prompt {
      color: #00ff00;
      font-weight: bold;
    }

    .command {
      color: #ffffff;
      margin-left: 5px;
    }

    .json-block {
      background: #2d2d2d;
      padding: 10px;
      border-left: 3px solid #00ff00;
      margin: 10px 0;
    }

    .json-line {
      color: #f8f8f2;
    }

    .indent {
      margin-left: 20px;
    }

    .output {
      color: #ffffff;
      margin: 5px 0 15px 20px;
      padding: 10px;
      background: #2d2d2d;
      border-left: 3px solid #ffbd2e;
    }

    .output.success {
      border-left-color: #27ca3f;
      color: #27ca3f;
    }

    .file-list {
      margin: 5px 0 15px 20px;
    }

    .file-item {
      display: flex;
      gap: 15px;
      margin-bottom: 3px;
      color: #ccc;
    }

    .file-permissions {
      color: #00ff00;
      width: 80px;
    }

    .file-date {
      color: #ffbd2e;
      width: 80px;
    }

    .file-name {
      color: #ffffff;
    }

    .skills-array {
      color: #f8f8f2;
      margin: 5px 0 15px 20px;
      padding: 10px;
      background: #2d2d2d;
      border-left: 3px solid #ff5f56;
    }

    .skill {
      color: #ffbd2e;
    }

    .git-log {
      margin: 5px 0 15px 20px;
    }

    .commit {
      display: flex;
      gap: 10px;
      margin-bottom: 3px;
    }

    .hash {
      color: #ffbd2e;
      font-weight: bold;
      width: 60px;
    }

    .message {
      color: #ffffff;
    }
  `]
})
export class TechTemplateComponent {
  @Input() cvData!: CVData;

  generateHash(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}