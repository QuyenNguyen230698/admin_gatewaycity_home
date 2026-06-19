<template>
  <div class="space-y-8 animate-fade-in p-4">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-black text-brand tracking-tighter italic uppercase underline decoration-blue-500/20">Spatial Intelligence</h2>
        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time Asset Rendering v4.0.2 / GPU: ACTIVE</p>
      </div>
      <div class="flex items-center gap-3">
         <BaseButton variant="primary" size="md" class="!rounded-2xl shadow-xl shadow-blue-500/20">
            <template #left-icon>
               <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
            </template>
            Upload 3D Parcel
         </BaseButton>
         <BaseButton variant="outline" size="md">Snapshot.tif</BaseButton>
      </div>
    </div>

    <!-- 3D Environment Frame -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
       <div class="lg:col-span-2 space-y-6">
          <ProductPreview />
          
          <div class="enterprise-card p-6 bg-white overflow-hidden group">
             <div class="flex items-center justify-between mb-4">
                <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Environment Diagnostics</h4>
                <span class="text-[9px] font-mono text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">REALTIME</span>
             </div>
             <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="i in 4" :key="i" class="p-4 bg-slate-50 rounded-2xl flex flex-col gap-1 border border-transparent group-hover:border-slate-100 transition-all">
                   <span class="text-[9px] font-bold text-slate-400 uppercase">Buffer_{{ i }}</span>
                   <span class="text-xs font-black text-slate-900 tabular-nums">{{ (Math.random() * 10).toFixed(2) }} ms</span>
                </div>
             </div>
          </div>
       </div>

       <!-- Workspace Sidebar -->
       <div class="space-y-8 h-full">
          <div class="enterprise-machine p-8 bg-white border border-slate-200 rounded-[2rem] space-y-8 shadow-2xl shadow-slate-200/50">
             <h4 class="text-xs font-black text-slate-900 uppercase tracking-[0.3em] border-b border-slate-100 pb-5 italic">Engine Config</h4>
             
             <div class="space-y-6">
                <!-- Mock Parameters -->
                <div v-for="param in ['Global Ambient', 'Ray Density', 'Fresnel Reflectivity']" :key="param" class="space-y-3">
                   <div class="flex justify-between items-center">
                      <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">{{ param }}</span>
                      <span class="text-[10px] font-mono text-blue-600 font-black">0.824</span>
                   </div>
                   <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full bg-blue-600 rounded-full w-2/3 shadow-lg shadow-blue-500/20"></div>
                   </div>
                </div>
             </div>

             <div class="pt-4 flex flex-col gap-3">
                <button class="w-full py-4 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 active:scale-95 transition-all shadow-xl shadow-slate-900/10">Run Optimizer</button>
                <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center leading-relaxed">System using Hardware Acceleration. Disable for low-power mobile devices.</p>
             </div>
          </div>

          <div class="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-blue-700 text-white space-y-4 shadow-2xl shadow-blue-500/30">
             <h4 class="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-white animate-ping"></div>
                Auto-Save Mode
             </h4>
             <p class="text-[11px] font-bold text-indigo-100 italic">Cloud syncing is active. All spatial changes for Asset_923 are being stored in the global warehouse database.</p>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
// Page meta now correctly uses default responsive layout
</script>
