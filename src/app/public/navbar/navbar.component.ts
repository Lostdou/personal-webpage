import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from '../../services/music.service';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarVisible = true;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioSelector') audioSelector!: ElementRef<HTMLSelectElement>; 

  isPlaying: boolean = false;
  progress: number = 0;
  currentAudio: string = '';

  constructor(
    private audioService: MusicService,
    private layoutService: LayoutService
  ) {}


  ngOnInit() {
    const navbarProfilePicture = document.getElementById('navbar-profile-picture');
    if (navbarProfilePicture) {
      navbarProfilePicture.style.display = 'block';
      navbarProfilePicture.style.opacity = '1';
      navbarProfilePicture.style.transform = 'translateY(0)';
    }
  }

  togglePlayPause(): void {
    const audio = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  updateProgress(): void {
    const audio = this.audioPlayer.nativeElement;
    if (audio.duration) {
      this.progress = (audio.currentTime / audio.duration) * 100;
      const progressInput = document.getElementById('audioProgress') as HTMLInputElement;
      progressInput.value = this.progress.toString();
    }
  }
  
  adjustVolume(event: Event): void {
    const audio = this.audioPlayer.nativeElement;
    const input = event.target as HTMLInputElement;
    audio.volume = parseFloat(input.value) / 100;
  }

  seekAudio(event: Event): void {
    const audio = this.audioPlayer.nativeElement;
    const input = event.target as HTMLInputElement;
    audio.currentTime = (parseFloat(input.value) / 100) * audio.duration;
  }

  playRandomMusic(): void {
    this.audioService.getRandomSong().subscribe(({ fileName, audioBlob, metadata }) => {
      const audioUrl = URL.createObjectURL(audioBlob);

      this.currentAudio = audioUrl;
      const audio = this.audioPlayer.nativeElement;
      audio.src = this.currentAudio;

      const selectElement = this.audioSelector.nativeElement;
      selectElement.value = fileName;

      audio.onloadeddata = () => {
        audio.play();
        this.isPlaying = true;

        Swal.fire({
          toast: true,
          position: 'bottom-start',
          html: `
            <div style="display: flex; align-items: center;">
              <img src="${metadata.cover}" alt="Cover" style="width: 100px; height: 100px; margin-right: 10px; border-radius: 5px;">
              <div style="text-align: left;">
                <strong>Título:</strong> ${metadata.title}<br>
                <strong>Artista/s:</strong> ${metadata.artists.join(', ')}<br>
                <strong>Álbum:</strong> ${metadata.album}
              </div>
            </div>
          `,
          background: '#121212',
          color: '#fff',
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            popup: 'sweet-popup'
          }
        });
      };

      audio.load();
    });
  }

  playSelectedMusic(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedFile = selectElement.value;

    if (selectedFile) {
      this.audioService.getSong(selectedFile).subscribe(({ fileName, audioBlob, metadata }) => {
        const audioUrl = URL.createObjectURL(audioBlob);

        this.currentAudio = audioUrl;
        const audio = this.audioPlayer.nativeElement;
        audio.src = this.currentAudio;

        const selectElement = this.audioSelector.nativeElement;
        selectElement.value = fileName;

        audio.onloadeddata = () => {
          audio.play();
          this.isPlaying = true;

          Swal.fire({
            toast: true,
            position: 'bottom-start',
            html: `
              <div style="display: flex; align-items: center;">
                <img src="${metadata.cover}" alt="Cover" style="width: 100px; height: 100px; margin-right: 10px; border-radius: 5px;">
                <div style="text-align: left;">
                  <strong>Título:</strong> ${metadata.title}<br>
                  <strong>Artista/s:</strong> ${metadata.artists.join(', ')}<br>
                  <strong>Álbum:</strong> ${metadata.album}
                </div>
              </div>
            `,
            background: '#121212',
            color: '#fff',
            timer: 3000,
            showConfirmButton: false,
            customClass: {
              popup: 'sweet-popup'
            }
          });
        };

        audio.load();
      });
    }
  }
}