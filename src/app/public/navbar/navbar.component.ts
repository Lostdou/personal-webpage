import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from '../../services/music.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarVisible = false;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  isPlaying: boolean = false;
  progress: number = 0;
  currentAudio: string = '';


  constructor(private audioService: MusicService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const profilePicture = document.getElementById('profile-picture');
    const navbarProfilePicture = document.getElementById('navbar-profile-picture');
    const navbarContainer = document.querySelector('.navbar-container');
    if (profilePicture && navbarProfilePicture && navbarContainer) {
      const rect = profilePicture.getBoundingClientRect();
      if (rect.bottom < 0) {
        this.isNavbarVisible = true;
        navbarProfilePicture.style.display = 'block';
        setTimeout(() => {
          navbarProfilePicture.style.opacity = '1';
          navbarProfilePicture.style.transform = 'translateY(0)';
        }, 10);
      } else {
        this.isNavbarVisible = false;
        navbarProfilePicture.style.opacity = '0';
        navbarProfilePicture.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          navbarProfilePicture.style.display = 'none';
        }, 300);
      }
    }
  }

  ngOnInit() {
    const navbarContainer = document.querySelector('.navbar-container');
    if (navbarContainer) {
      navbarContainer.classList.toggle('visible', this.isNavbarVisible);
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
    this.progress = (audio.currentTime / audio.duration) * 100;
  }

  seekAudio(event: Event): void {
    const audio = this.audioPlayer.nativeElement;
    const input = event.target as HTMLInputElement;
    audio.currentTime = (parseFloat(input.value) / 100) * audio.duration;
  }


  playRandomMusic(): void {
    this.audioService.getRandomSong().subscribe(({ fileName, audioBlob, metadata }) => {
      console.log('Audio Blob:', audioBlob); // Log the audio blob for debugging
      console.log('File Name:', fileName); // Log the file name for debugging
      console.log('Metadata:', metadata); // Log the metadata for debugging

      const audioUrl = URL.createObjectURL(audioBlob);

      this.currentAudio = audioUrl;
      const audio = this.audioPlayer.nativeElement;
      audio.src = this.currentAudio;

      audio.onloadeddata = () => {
        audio.play();
        this.isPlaying = true;

        // SweetAlert with metadata
        Swal.fire({
          toast: true,
          position: 'top-end',
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
